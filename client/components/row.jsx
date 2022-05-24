import React, { Component } from 'react';
import NoteButton from './noteButton.jsx';
import EditRow from './editRow.jsx';

class Row extends Component {
  render () {
    const buttons = [];
    for (let i = 0; i < 8; i++){
      buttons.push(<NoteButton key={i}/>)
    }
    return (
      <div className='row'>
        {buttons}
        <EditRow/>
      </div>
    )
  }
}

export default Row;