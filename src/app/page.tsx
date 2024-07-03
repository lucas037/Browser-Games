"use client"

import React, { useRef } from 'react';
import { addPlayersAcess } from './services/dataAcess/playersAcess';
import { addPartyAcess, addPlayertoParty, getPartyIdByCode } from './services/dataAcess/partyAcess';
import { IdPlayerProvider, useIdPlayer } from './contexts/PlayerContext';
import { Player } from './types/PlayerType';

const Home = () => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputCodeRef = useRef<HTMLInputElement>(null);
  const { idPlayer, setIdPlayer } = useIdPlayer();

  async function createParty() {
    let name = "";

    if (inputNameRef.current)
      name = inputNameRef.current.value;

    if (name !== "") {
      const joinCodeParty = Math.floor(Math.random() * 999999).toString();

      let partyId = await addPartyAcess(joinCodeParty);
      let playerId = await addPlayersAcess(name, partyId, true);

      const player: Player = {
        name: name,
        partyId: partyId,
        leader: true,
        status: "Not Ready"
      }

      await addPlayertoParty(partyId, player);

      if (typeof window !== "undefined") {
        setIdPlayer(playerId); // Atualiza o contexto com o novo idPlayer
        window.location.href = "/" + partyId;
      }
    }
  }

  async function joinparty() {
    let name = "";
    let partyCode = "";

    if (inputNameRef.current && inputCodeRef.current) {
      name = inputNameRef.current.value;
      partyCode = inputCodeRef.current.value;
    }

    let partyId = null;
    if (name !== "" && partyCode != "") {
      partyId = await getPartyIdByCode(partyCode);
    }

    if (partyId != null) {
      let playerId = await addPlayersAcess(name, partyId, false);

      // Adiciona o jogador ao grupo
      const player: Player = {
        name: name,
        partyId: partyId,
        leader: false,
        status: "Not Ready"
      }
      await addPlayertoParty(partyId, player);

      if (typeof window !== "undefined") {
        setIdPlayer(playerId); // Atualiza o contexto com o novo idPlayer
        window.location.href = "/" + partyId;
      }
    }
  }

  return (
    <div className="bg-blue-200 h-screen flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col">
        <div className="ml-2">Name</div>
        <div className="h-[35px] w-[300px] border">
          <input className="text-base h-full w-full text-center" ref={inputNameRef}></input>
        </div>
      </div>
      <div className="w-[300px] h-[35px] bg-black rounded-xl">
        <button onClick={createParty} className="h-full w-full text-white">Create Party</button>
      </div>

      <div className="flex flex-col">
        <div className="ml-2">Code</div>
        <div className="h-[35px] w-[300px] border">
          <input className="text-base h-full w-full text-center" ref={inputCodeRef}></input>
        </div>
      </div>
      <div className="w-[300px] h-[35px] bg-black rounded-xl">
        <button onClick={joinparty} className="h-full w-full text-white">Join Party</button>
      </div>
    </div>
  );
};

const App = () => (
  <IdPlayerProvider>
    <Home />
  </IdPlayerProvider>
);

export default App;
