import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/login.jsx'
import Register from "./components/pages/register.jsx";
import Machine from './components/machine.jsx';
import './stylesheets/styles.css';
import * as Tone from 'tone';

export default function App() {

  const [ bpm, setBpm ] = useState(120);
  const [ beat, setBeat ] = useState(0);
  const [ synthCount, setSynthCount ] = useState(4);
  const [ notes, setNotes ] = useState(["F4", "Eb4", "C4", "G4"]);
  const [ grid, setGrid ] = useState([]);
  const [ login, setLogin ] = useState({ username: '', pass: '', incorrectLogin: '' });
  const [ register, setRegister ] = useState({ username: '', pass: '', userExists: '' });
  const [ currentUser, setCurrentUser ] = useState('');
  const [ viewPreset, setViewPreset ] = useState(false);
  const [ handleBpm, setHandleBpm ] = useState('');
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ scheduleRepeatId, setScheduleRepeatId ] = useState(0);
  const [ transportLocation, setTransportLocation ] = useState(0);

  useEffect (() => {
    const start = async () => { 
      loadUserPresets();
      setGrid(makeGrid(notes));
      await Tone.start();
      configLoop();
    }
    start();
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target
    if (id === 'loginUsernameField'){
      const currentLogin = {...login};
      currentLogin.username = value;
      setLogin(currentLogin);
    } 
    if (id === 'loginPasswordField'){
      const currentLogin = {...login};
      currentLogin.pass = value;
      setLogin(currentLogin);
    }
    if (id === 'registerUsernameField'){
      const currentRegister = {...register};
      currentRegister.username = value;
      setRegister(currentRegister);
    } 
    if (id === 'registerPasswordField'){
      const currentRegister = {...register};
      currentRegister.pass = value;
      setRegister(currentRegister);
    }
    if (id === 'setBpm'){
      setHandleBpm(value);
    }
  }

  const submitLogin = async (event) => {
    event.preventDefault();

    login.incorrectLogin = '';
    setLogin(login);

    const { username, pass } = login;
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
      return setLogin(login);
    }
    return res;
  }

  const submitRegister = async (event) => {
    event.preventDefault()

    const { username, pass } = register;
    
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

  const loadUserPresets = async (event) => {
    if (event) event.preventDefault(); 
    try {
      const res = await fetch('/api/loadPreset', {
        method: 'get'
      })
      const data = await res.json();
      const { bpm, beat, synthCount, notes, grid,  } = data.preset;

      setBpm(bpm);
      setBeat(beat);
      setSynthCount(synthCount);
      setNotes(notes);
      setGrid(grid);
      setViewPreset(true);
      setCurrentUser(data.username);

      return configLoop();

    } catch (err) {
      console.log(err);
    }
  }

  const updatePreset = async (event) => {
    if (event) event.preventDefault();
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

  const makeSynths = (count) => {
    const synths = [];
    for (let i = 0; i < count; i++){
      const synth = new Tone.Synth().toDestination();
      synths.push(synth);
    }
    return synths;
  }

  const makeGrid = (notes) => {
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

  const configLoop = () => {
    stop();
    Tone.Transport.clear(scheduleRepeatId);
    const synths = makeSynths(synthCount);

    let currentBeat = beat;

    const repeat = (time) => {
      grid.forEach((row, index) => {
        let synth = synths[index];
        let note = row[currentBeat];
        if (note.isActive) {
          synth.triggerAttackRelease(note.note, "8n", time);
        }
      });
      currentBeat = (currentBeat + 1) % 8;
      setTransportLocation(currentBeat);
    };

    Tone.Transport.bpm.value = bpm;
    const id = Tone.Transport.scheduleRepeat(repeat, "8n");
    setScheduleRepeatId(id);
    return id;
  }

  const editSequence = (event) => {
    event.preventDefault();
    const rowVal = Number(event.target.id[0]);
    const noteVal = Number(event.target.id[1]);
    if (grid[rowVal][noteVal].isActive){
      grid[rowVal][noteVal].isActive = false;
    } else {
      grid[rowVal][noteVal].isActive = true;
    }
    setGrid(grid);
  }

  const editNote = (event) => {
    event.preventDefault();
    notes[Number(event.target.id)] = event.target.value + '4';
    grid[Number(event.target.id)].forEach(obj => {
      obj.note = event.target.value + '4';
    })
    setNotes(notes);
    setGrid(grid);
  }

  const startStop = (event) => {
    if (event) event.preventDefault();
    if (isPlaying){ 
      Tone.Transport.stop();
      setIsPlaying(false);
    } else {
      Tone.Transport.start()
      setIsPlaying(true);
    }
  }

  const stop = (event) => {
    if (event) preventDefault()
    Tone.Transport.stop();
    setIsPlaying(false);
  }

  const adjustBpm = (event) => {
    if (event) event.preventDefault();
    Tone.Transport.bpm.value = handleBpm;
    setBpm(handleBpm);
  }

  return (
    <Routes>

      <Route exact path='/' element={
        <Machine 
          viewPreset={viewPreset} 
          bpm={bpm}
          notes={notes}
          currentUser={currentUser}
          grid={grid}
          transportLocation={transportLocation}
          editNote={editNote}
          editSequence={editSequence}
          stop={stop}
          startStop={startStop}
          adjustBpm={adjustBpm}
          loadUserPresets={loadUserPresets} 
          updatePreset={updatePreset} 
          handleChange={handleChange}
        />
      }/>

      <Route exact path='/login' element={
        <Login 
          incorrectLogin={login.incorrectLogin}
          handleChange={handleChange} 
          submitLogin={submitLogin} 
          loadUserPresets={loadUserPresets}
        />}
      />

      <Route exact path='/register' element={
        <Register
          userExists={register.userExists}
          handleChange={handleChange}
          submitRegister={submitRegister}
          loadUserPresets={loadUserPresets}
        />}
      />

    </Routes>
  )
}