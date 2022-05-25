import React from 'react';
import Row from './row.jsx';
import TransportCtl from './transportCtl.jsx';

const Box = props => {
  return (
    <div className='machineContainer'>
      <TransportCtl/>
      <Row/>
      <Row/>
      <Row/>
    </div>
  )
}

export default Box;