import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from './box.jsx';
import LoginName from './loginName.jsx';

const  Machine = (props) =>  {

  let loginName = '';
  if (props.currentUser) loginName = <LoginName currentUser={props.currentUser}/>;
  
  return (
    <div className='app'>
      <header className='appHeader'>
        <div/>
        <div className='headerFiller'>
          <h1 className='title'>CsSq-1</h1>
          {loginName}
        </div>
        <div className='loginRegContainer'>
          <Link to='/login' onClick={() => props.stop()}>Login</Link>
          <Link to='/register' onClick={() => props.stop()}>Register</Link>
        </div>
      </header>
      <div className='appBody'>
        <Box 
          //bpm={props.bpm} 
          notes={props.notes}
          grid={props.grid}
          transportLocation={props.transportLocation}
          editNote={props.editNote}
          editSequence={props.editSequence}
          //startStop={props.startStop}
          //adjustBpm={props.adjustBpm}
          viewPreset={props.viewPreset} 
          updatePreset={props.updatePreset} 
          loadUserPresets={props.loadUserPresets} 
          handleChange={props.handleChange}
        />
      </div>
      <div>
        {props.authUser}
      </div>
    </div>
  )
}

export default Machine;