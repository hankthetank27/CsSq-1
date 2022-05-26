import React, { Component } from 'react';
import NoteButton from './noteButton.jsx';
import EditRow from './editRow.jsx';

class Row extends Component {
  render () {
    const buttons = [];
    for (let i = 0; i < 8; i++){
      let isActive = false;
      const rowArr = this.props.grid[this.props.rowNum];
      if (rowArr && rowArr[i].isActive) isActive = true;
      let currentId = `${this.props.rowNum}${i}`;
      buttons.push(<NoteButton id={currentId} key={`buttonKey${i}`} editSequence={this.props.editSequence} isActive={isActive}/>)
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