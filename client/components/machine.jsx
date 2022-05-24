import React from 'react';
import Row from './row.jsx';
import TransportCtl from './transportCtl.jsx';
import * as Tone from 'tone';

const Machine = props => {
  return (
    <div className='machineContainer'>
      <TransportCtl/>
      <Row/>
      <Row/>
      <Row/>
    </div>
  )
}

export default Machine;