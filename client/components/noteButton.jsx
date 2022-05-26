import React from 'react';

const NoteButton = props => {
  let fill = ''
  if (props.isActive) fill = '-'
  return (
    <button className='noteButton' id={props.id} onClick={props.editSequence}>{fill}</button>
  )
}

export default NoteButton;