import React from 'react';
import Row from './row.jsx';
import TransportCtl from './transportCtl.jsx';

const Box = props => {
  const rows = [];
  for (let i = 0; i < props.notes.length; i++){
    rows.push(<Row id={
      `row${i}`} 
      key={`keyRow${i}`} 
      rowNum={i}
      transportLocation={props.transportLocation} 
      editSequence={props.editSequence} 
      editNote={props.editNote} 
      grid={props.grid}
    />)
  }
  return (
    <div className='machineContainer'>
      <TransportCtl 
        bpm={props.bpm}
        startStop={props.startStop}
        //adjustBpm={props.adjustBpm}
        viewPreset={props.viewPreset} 
        updatePreset={props.updatePreset} 
        loadUserPresets={props.loadUserPresets} 
        handleChange={props.handleChange}
      />
      {rows}
    </div>
  )
}

export default Box;