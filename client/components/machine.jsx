import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Box from './box.jsx';
import LoginName from './loginName.jsx';

class Machine extends Component {
  render () {
    let loginName;
    if (this.props.currentUser) loginName = <LoginName currentUser={this.props.currentUser}/>;
    return (
      <div className='app'>
        <header className='appHeader'>
          <div/>
          <div className='headerFiller'>
            <h1 className='title'>CsSq-1</h1>
            {loginName}
          </div>
          <div className='loginRegContainer'>
            <Link to='/login' onClick={() => this.props.stop()}>Login</Link>
            <Link to='/register' onClick={() => this.props.stop()}>Register</Link>
          </div>
        </header>
        <div className='appBody'>
          <Box 
            bpm={this.props.bpm} 
            notes={this.props.notes}
            grid={this.props.grid}
            transportLocation={this.props.transportLocation}
            editNote={this.props.editNote}
            editSequence={this.props.editSequence}
            startStop={this.props.startStop}
            //adjustBpm={this.props.adjustBpm}
            viewPreset={this.props.viewPreset} 
            updatePreset={this.props.updatePreset} 
            loadUserPresets={this.props.loadUserPresets} 
            handleChange={this.props.handleChange}
          />
        </div>
        <div>
          {this.props.authUser}
        </div>
      </div>
    )
  }
}

export default Machine;