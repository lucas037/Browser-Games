"use client"

import React, { useRef, useState } from 'react';
import { Player } from './types/PlayerType';
import Home from './routers/Home';

const App = () => {
  const [playerId, setPlayerId] = useState<string>("");
  
  const updateContext = (playerId: string) => {
    setPlayerId(playerId);
    
    window.location.href = `/lobby/${playerId}`;
  }
  

  return (
    <Home updateContext={updateContext}/>
  )
}

export default App;
