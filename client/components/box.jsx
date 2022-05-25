import React from 'react';
import Row from './row.jsx';
import TransportCtl from './transportCtl.jsx';

const Box = props => {
  return (
    <div className='machineContainer'>
      <TransportCtl 
        bpm={props.bpm}
        startStop={props.startStop}
        adjustBpm={props.adjustBpm}
        viewPreset={props.viewPreset} 
        updatePreset={props.updatePreset} 
        loadUserPresets={props.loadUserPresets} 
        handleChange={props.handleChange}
      />
      <Row/>
      <Row/>
      <Row/>
    </div>
  )
}

export default Box;