import React, { useState, useEffect } from 'react';
import { Transport } from 'tone';


const SetBPM = () => {

const [ bpm, setBpm ] = useState(120);
const [ bpmHandler, setBpmHandler ] = useState();

const handleChange = event => {
  event.preventDefault();
  setBpmHandler(event.target.value);
};

const adjustBpm = event => {
  event.preventDefault();
  Transport.bpm.value = bpmHandler;
  setBpm(bpmHandler);
};

 return (
  <form className='bpmForm'>
    <button onClick={adjustBpm}>Set BPM</button>
    <input 
      type='text' 
      id='setBpm' 
      onChange={handleChange} 
      className='bpmInputField' 
      placeholder={bpm.toString()} 
      autoComplete='off'
    />
  </form>
 )
};

export default SetBPM; 