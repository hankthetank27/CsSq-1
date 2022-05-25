import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Box from './box.jsx';

class Machine extends Component {
  render () {
    return (
      <div className='app'>
        <header className='appHeader'>
          <h1 className='title'>Drum Machine</h1>
          <div className='headerFiller'/>
          <div className='loginRegContainer'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        </header>
        <div className='appBody'>
          <Box/>
        </div>
        <div>
          {this.props.authUser}
        </div>
      </div>
    )
  }
}

export default Machine;