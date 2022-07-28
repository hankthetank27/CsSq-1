import React, { useState } from 'react';

const EditRow = props => {

  // const [ notes, setNotes ] = useState();
  // const [ grid, setGrid ] = useState();

  // const editNote = (event) => {
  //   event.preventDefault();
  //   //const { notes, grid } = this.state;
  //   notes[Number(event.target.id)] = event.target.value + '4';

  //   grid[Number(event.target.id)].forEach(obj => {
  //     obj.note = event.target.value + '4';
  //   })

  //   setNotes(notes);
  //   setGrid(grid);

  //   // this.setState({notes: notes, grid: grid}, () => {
  //   //   console.log('setState on editNote:, ', this.state)
  //   // })
  // }

 return (
   <div className='editRow'>
      <select className="noteOptions" id={props.id} onChange={props.editNote}>
        <option>--Select Note--</option>
        <option>A</option>
        <option>Bb</option>
        <option>B</option>
        <option>C</option>
        <option>Db</option>
        <option>D</option>
        <option>Eb</option>
        <option>E</option>
        <option>F</option>
        <option>Gb</option>
        <option>G</option>
        <option>Ab</option>
      </select>
   </div>
 )
}

export default EditRow; 