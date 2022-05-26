import React from 'react';

const NoteButton = props => {
  let fill = '#d9f0e8';
  if (props.isActive) fill = '#b7d3c9';
  if (props.transportOnStep) fill = '#e1f0d988';
  return (
    <button 
      className='noteButton' 
      id={props.id} 
      onClick={props.editSequence} 
      style={{backgroundColor: fill}}
    /> 
  )
}

export default NoteButton;