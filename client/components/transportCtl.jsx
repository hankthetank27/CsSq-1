import React, { Component } from 'react';
import SetBPM from './setBpm.jsx';
import StartStop from './startStop.jsx';
import PresetUpdate from './updatePreset.jsx';

class TransportCtl extends Component {
  render () {
    let preset;
    if (this.props.viewPreset) preset = <PresetUpdate updatePreset={this.props.updatePreset} loadUserPresets={this.props.loadUserPresets}/>;
    return (
      <div className='transport'>
        <SetBPM bpm={this.props.bpm} adjustBpm={this.props.adjustBpm} handleChange={this.props.handleChange}/>
        {preset}
        <StartStop startStop={this.props.startStop}/>
      </div>
    )
  }
}

export default TransportCtl; 