import React, { Component } from 'react';
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
      grid: []
    }
    this.makeSynths = this.makeSynths.bind(this);
    this.makeGrid = this.makeGrid.bind(this);
    this.configLoop = this.configLoop.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount () {
    this.setState({grid: this.makeGrid(this.state.notes)}, () => {
      Tone.start().then(() => {
        console.log('did mount', this.state)
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
    return (
      <div className='app'>
        <Machine/>
      </div>
    )
  }
}

export default App;