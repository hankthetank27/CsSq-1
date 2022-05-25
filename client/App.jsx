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
      synthCount: 3,
      notes: ["F4", "Eb4", "C4"],
      grid: [],
      login: {
        username: '',
        pass: '',
        incorrectLogin: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.makeSynths = this.makeSynths.bind(this);
    this.makeGrid = this.makeGrid.bind(this);
    this.configLoop = this.configLoop.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleChange (event) {
    const { id, value } = event.target
    if (id === 'loginUsernameField'){
      const login = {...this.state.login}
      login.username = value;
      this.setState({login}, () => console.log(this.state))
    } 
    if (id === 'loginPasswordField'){
      const login = {...this.state.login}
      login.pass = value;
      this.setState({login}, () => console.log(this.state))
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

  componentDidMount () {
    this.setState({grid: this.makeGrid(this.state.notes)}, () => {
      Tone.start().then(() => {
        const{ grid, synthCount } = this.state;
        const synths = this.makeSynths(synthCount);
        this.configLoop(grid, synths);
      })
    })
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

  configLoop (grid, synths) {
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
    Tone.Transport.bpm.value = this.state.bpm;
    Tone.Transport.scheduleRepeat(repeat, "8n");
  }

  render () {
    const { incorrectLogin } = this.state.login
    return (
      <Routes>
        <Route exact path='/' element={<Machine/>}/>
        <Route exact path='/login' element={<Login handleChange={this.handleChange} submitLogin={this.submitLogin} incorrectLogin={incorrectLogin}/>}/>
        <Route exact path='/register' element={<Register/>}/>
      </Routes>
    )
  }
}

export default App;
