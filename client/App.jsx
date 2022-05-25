import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/login.jsx'
import Register from "./components/pages/register.jsx";
import Machine from './components/machine.jsx';
import './stylesheets/styles.css';
import * as Tone from 'tone';
import { set } from 'mongoose';

class App extends Component {
  constructor () {
    super();
    this.state = {
      bpm: 120,
      beat: 0,
      synthCount: 3,
      notes: ["F4", "Eb4", "C4"],
      grid: [],
      login: {
        username: '',
        pass: '',
        incorrectLogin: ''
      },
      viewPreset: false,
      setBpm: '',
      isPlaying: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.loadUserPresets = this.loadUserPresets.bind(this);
    this.updatePreset = this.updatePreset.bind(this);
    this.startStop = this.startStop.bind(this); 
    this.adjustBpm = this.adjustBpm.bind(this);
    this.makeSynths = this.makeSynths.bind(this);
    this.makeGrid = this.makeGrid.bind(this);
    this.configLoop = this.configLoop.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount () {
    this.loadUserPresets();

    this.setState({grid: this.makeGrid(this.state.notes)}, () => {
      Tone.start().then(() => {

        this.configLoop();
      })
    })
  }

  handleChange (event) {
    const { id, value } = event.target
    if (id === 'loginUsernameField'){
      const login = {...this.state.login}
      login.username = value;
      this.setState({login}, () => console.log(this.state));
    } 
    if (id === 'loginPasswordField'){
      const login = {...this.state.login}
      login.pass = value;
      this.setState({login}, () => console.log(this.state));
    }
    if (id === 'setBpm'){
      this.setState({setBpm: value}, () => console.log(this.state));
    }
  }

  async submitLogin (event) {
    event.preventDefault()

    const login = {...this.state.login};
    login.incorrectLogin = '';
    this.setState({login})

    const { username, pass } = this.state.login;
    const data = username + " " + pass;
    const res = await fetch('/api/', {
        method: 'get',
        headers: {
          "Content-Type": "text/plain",
          'Authorization': data
        }
      }
    )
    if (res.status !== 200) {
      login.incorrectLogin = 'Incorrect username or password';
      this.setState({login})
    } 
    return res;
  }

  async loadUserPresets (event) {
    if (event) event.preventDefault(); 
    try {
      const res = await fetch('/api/loadPreset', {
        method: 'get'
      })
      const data = await res.json();
      const { bpm, beat, synthCount, notes, grid } = data.preset;
      this.setState({
        bpm: bpm,
        beat: beat,
        synthCount: synthCount,
        notes: notes,
        grid: grid,
        viewPreset: true 
      }, () => {
        console.log('current user preset data', data.preset)
        console.log('state after loading user preset: ', this.state)
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updatePreset (event) {
    event.preventDefault();
    const { bpm, beat, synthCount, notes, grid } = this.state;
    try {
      const res = await fetch('/api/updatePreset', {
        method: 'put',
        body: JSON.stringify({
          bpm: bpm,
          beat: beat,
          synthCount: synthCount,
          notes: notes,
          grid: grid
        }),
        headers: {
          'Content-Type' : 'application/json; charset=UTF-8'
        }
      })
      const data = await res.json();
      console.log('updateUserPrest respose: ', data);
    } catch (err) {
      console.log(err);
    }
  }

  makeSynths (count) {
    const synths = [];
    for (let i = 0; i < count; i++){
      const synth = new Tone.Synth().toDestination();
      synths.push(synth);
    }
    return synths;
  }

  makeGrid (notes) {
    const rows = [];
    for (const note of notes) {
      const row = [];
      for (let i = 0; i < 8; i++){
        row.push({note: note, isActive: true})
      }
      rows.push(row);
    }
    return rows;
  }

  configLoop () {
    const{ grid, synthCount, bpm } = this.state;
    const synths = this.makeSynths(synthCount);
    let beat = this.state.beat;
    const repeat = (time) => {
      grid.forEach((row, index) => {
        let synth = synths[index];
        let note = row[beat];
        console.log(note)
        if (note.isActive) {
          synth.triggerAttackRelease(note.note, "8n", time);
        }
      });
      beat = (beat + 1) % 8;
      console.log('beat :', beat)
    };
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.scheduleRepeat(repeat, "8n");
  }

  async startStop (event) {
    event.preventDefault();
    const { isPlaying } = this.state;
    if (isPlaying){ 
      await Tone.Transport.stop();
      this.setState({isPlaying : false});
    } else {
      this.configLoop(); 
      await Tone.Transport.start()
      this.setState({isPlaying : true});
    }
  }

  adjustBpm () {
    const { setBpm } = this.state;
    this.setState({bpm: setBpm}, () => {
      this.configLoop();
    });
  }

  render () {
    const { incorrectLogin } = this.state.login;
    const { viewPreset, bpm } = this.state;
    return (
      <Routes>

        <Route exact path='/' element={<Machine 
          viewPreset={viewPreset} 
          bpm={bpm}
          startStop={this.startStop}
          adjustBpm={this.adjustBpm}
          loadUserPresets={this.loadUserPresets} 
          updatePreset={this.updatePreset} 
          handleChange={this.handleChange}
        />}/>

        <Route exact path='/login' element={<Login 
          handleChange={this.handleChange} 
          submitLogin={this.submitLogin} 
          loadUserPresets={this.loadUserPresets} 
          incorrectLogin={incorrectLogin}
        />}/>

        <Route exact path='/register' element={<Register/>}/>

      </Routes>
    )
  }
}

export default App;