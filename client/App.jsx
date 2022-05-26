import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/login.jsx'
import Register from "./components/pages/register.jsx";
import Machine from './components/machine.jsx';
import './stylesheets/styles.css';
import * as Tone from 'tone';

class App extends Component {
  constructor () {
    super();
    this.state = {
      bpm: 120,
      beat: 0,
      synthCount: 4,
      notes: ["F4", "Eb4", "C4", "G4"],
      grid: [],
      login: {
        username: '',
        pass: '',
        incorrectLogin: ''
      },
      register: {
        username: '',
        pass: '',
        userExists: ''
      },
      currentUser: '',
      viewPreset: false,
      setBpm: '',
      isPlaying: false,
      scheduleRepeatId: 0,
      transportLocation: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.loadUserPresets = this.loadUserPresets.bind(this);
    this.updatePreset = this.updatePreset.bind(this);
    this.startStop = this.startStop.bind(this);
    this.stop = this.stop.bind(this); 
    this.adjustBpm = this.adjustBpm.bind(this);
    this.makeSynths = this.makeSynths.bind(this);
    this.makeGrid = this.makeGrid.bind(this);
    this.configLoop = this.configLoop.bind(this);
    this.editSequence = this.editSequence.bind(this);
    this.editNote = this.editNote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount () { 
    this.setState({grid: this.makeGrid(this.state.notes)}, () => {
      Tone.start().then(() => {
        this.configLoop();
      })
    })
    this.loadUserPresets();
  }

  handleChange (event) {
    const { id, value } = event.target
    if (id === 'loginUsernameField'){
      const login = {...this.state.login}
      login.username = value;
      this.setState({login}, () => console.log(this.state.login));
    } 
    if (id === 'loginPasswordField'){
      const login = {...this.state.login}
      login.pass = value;
      this.setState({login}, () => console.log(this.state.login));
    }
    if (id === 'registerUsernameField'){
      const register = {...this.state.register}
      register.username = value;
      this.setState({register}, () => console.log(this.state.register));
    } 
    if (id === 'registerPasswordField'){
      const register = {...this.state.register}
      register.pass = value;
      this.setState({register}, () => console.log(this.state.register));
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
      return this.setState({login});
    }
    return res;
  }

  async submitRegister (event) {
    event.preventDefault()

    const { username, pass } = this.state.register;
    const { bpm, beat, synthCount, notes, grid } = this.state;
    try {
      const res = await fetch('/api/', {
        method: 'post',
        body: JSON.stringify({
          username: username,
          password: pass,
          preset: {
            bpm: bpm,
            beat: beat,
            synthCount: synthCount,
            notes: notes,
            grid: grid
          }
        }),
        headers: {
          'Content-Type' : 'application/json; charset=UTF-8'
        }
      })
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async loadUserPresets (event) {
    if (event) event.preventDefault(); 
    try {
      const res = await fetch('/api/loadPreset', {
        method: 'get'
      })
      const data = await res.json();
      const { bpm, beat, synthCount, notes, grid,  } = data.preset;
      this.setState({
        bpm: bpm,
        beat: beat,
        synthCount: synthCount,
        notes: notes,
        grid: grid,
        viewPreset: true,
        currentUser: data.username
      }, () => {
        console.log('current user preset data', data.preset)
        console.log('state after loading user preset: ', this.state)
        return this.configLoop()
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updatePreset (event) {
    if (event) event.preventDefault();
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
        row.push({note: note, isActive: false})
      }
      rows.push(row);
    }
    return rows;
  }

  configLoop () {

    this.stop()
    Tone.Transport.clear(this.state.scheduleRepeatId);

    const{ grid, synthCount, bpm } = this.state;
    const synths = this.makeSynths(synthCount);
    let beat = this.state.beat;

    const repeat = (time) => {
      grid.forEach((row, index) => {
        let synth = synths[index];
        let note = row[beat];
        if (note.isActive) {
          synth.triggerAttackRelease(note.note, "8n", time);
        }
      });
      beat = (beat + 1) % 8;
      this.setState({transportLocation: beat}, ()=> {
        console.log('beat :', this.state.transportLocation)
      })
    };

    Tone.Transport.bpm.value = bpm;
    const id = Tone.Transport.scheduleRepeat(repeat, "8n");
    this.setState({scheduleRepeatId: id})
    return id;
  }

  editSequence (event) {
    event.preventDefault();
    const { grid } = this.state;
    const rowVal = Number(event.target.id[0]);
    const noteVal = Number(event.target.id[1]);
    if (grid[rowVal][noteVal].isActive){
      grid[rowVal][noteVal].isActive = false;
    } else {
      grid[rowVal][noteVal].isActive = true;
    }
    this.setState({grid: grid})
  }

  editNote (event) {
    event.preventDefault();
    const { notes, grid } = this.state;
    notes[Number(event.target.id)] = event.target.value + '4';
    console.log(notes)

    grid[Number(event.target.id)].forEach(obj => {
      obj.note = event.target.value + '4';
    })

    this.setState({notes: notes, grid: grid}, () => {
      console.log('setState on editNote:, ', this.state)
    })
  }

  startStop (event) {
    if (event) event.preventDefault();
    const { isPlaying } = this.state;
    if (isPlaying){ 
      Tone.Transport.stop();
      this.setState({isPlaying : false});
    } else {
      Tone.Transport.start()
      this.setState({isPlaying : true});
    }
  }

  stop (event) {
    if (event) preventDefault()
    Tone.Transport.stop();
    this.setState({isPlaying : false});
  }

  adjustBpm (event) {
    if (event) event.preventDefault();
    const { setBpm } = this.state;
    Tone.Transport.bpm.value = setBpm;
    this.setState({bpm: setBpm})
  }

  render () {
    const { incorrectLogin } = this.state.login;
    const { userExists } = this.state.register;
    const { viewPreset, bpm, notes, currentUser, grid, transportLocation } = this.state;
    return (
      <Routes>

        <Route exact path='/' element={<Machine 
          viewPreset={viewPreset} 
          bpm={bpm}
          notes={notes}
          currentUser={currentUser}
          grid={grid}
          transportLocation={transportLocation}
          editNote={this.editNote}
          editSequence={this.editSequence}
          stop={this.stop}
          startStop={this.startStop}
          adjustBpm={this.adjustBpm}
          loadUserPresets={this.loadUserPresets} 
          updatePreset={this.updatePreset} 
          handleChange={this.handleChange}
        />}/>

        <Route exact path='/login' element={<Login 
          incorrectLogin={incorrectLogin}
          handleChange={this.handleChange} 
          submitLogin={this.submitLogin} 
          loadUserPresets={this.loadUserPresets}
        />}/>

        <Route exact path='/register' element={<Register
          userExists={userExists}
          handleChange={this.handleChange}
          submitRegister={this.submitRegister}
          loadUserPresets={this.loadUserPresets}
        />}/>

      </Routes>
    )
  }
}

export default App;