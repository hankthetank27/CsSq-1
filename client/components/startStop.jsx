import React from 'react';
import * as Tone from 'tone';

let isPlaying = false;
const startStop = async () => {
  if (isPlaying){  
    await Tone.Transport.stop();
    isPlaying = false;
  } else {
    await Tone.Transport.start()
    isPlaying = true;
  }
}

const StartStop = props => {
 return (
   <button onClick={startStop}>Start/Stop</button>
 )
}

export default StartStop; 