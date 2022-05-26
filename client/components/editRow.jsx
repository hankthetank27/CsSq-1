import React from 'react';

const EditRow = props => {
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