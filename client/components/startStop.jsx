import React, { useState } from 'react';
import { Transport } from 'tone';

const StartStop = () => {

  const [ isPlaying, setIsPlaying ] = useState(false);

  const startStop = (event) => {
    event.preventDefault();
    if (isPlaying === true){ 
      Transport.stop();
      setIsPlaying(false);
    } else {
      Transport.start()
      setIsPlaying(true);
    }
  }

 return (
   <button className='startStop' onClick={startStop}>Start/Stop</button>
 )
}

export default StartStop; 