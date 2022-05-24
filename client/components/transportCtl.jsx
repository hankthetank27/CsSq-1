import React, { Component } from 'react';
import SetBPM from './setBpm.jsx';
import StartStop from './startStop.jsx';

class TransportCtl extends Component {
  render () {
    return (
      <div className='transport'>
        <SetBPM/>
        <StartStop/>
      </div>
    )
  }
}

export default TransportCtl; 