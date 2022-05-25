import React from 'react';

const SetBPM = props => {
 return (
  <form className='bpmForm'>
    <button onClick={props.adjustBpm}>Set BPM</button>
    <input type='text' id='setBpm' onChange={props.handleChange} className='bpmInputField' placeholder={props.bpm.toString()}/>
  </form>
 )
}

export default SetBPM; 