import React, { Component } from 'react';
import NoteButton from './noteButton.jsx';
import EditRow from './editRow.jsx';

class Row extends Component {
  render () {
    const buttons = [];

    for (let i = 0; i < 8; i++){

      let isActive = false;
      let transportOnStep = false;
      const rowArr = this.props.grid[this.props.rowNum];
      const currentId = `${this.props.rowNum}${i}`;

      if (rowArr && rowArr[i].isActive) isActive = true;
      if (this.props.transportLocation === i) transportOnStep = true;

      buttons.push(
        <NoteButton 
          id={currentId} 
          key={`buttonKey${i}`} 
          editSequence={this.props.editSequence}
          transportLocation={this.props.transportLocation} 
          isActive={isActive}
          transportOnStep={transportOnStep}
        />
      )
    }

    return (
      <div className='row'>
        {buttons}
        <EditRow id={this.props.rowNum} editNote={this.props.editNote}/>
      </div>
    )
  }
}

export default Row;