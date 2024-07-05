import { useRef } from "react";
import { addPartyAcess, addPlayertoParty, getPartyIdByCode } from "../services/dataAcess/partyAcess";
import { addPlayersAcess } from "../services/dataAcess/playersAcess";
import { Player } from "../types/PlayerType";

interface HomeScreenProps {
    updateContext: (playerId: string) => void;
}

export default function HomeScreen({updateContext}: HomeScreenProps) {
    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputCodeRef = useRef<HTMLInputElement>(null);
  
    async function createParty() {
      let name = "";
  
      if (inputNameRef.current)
        name = inputNameRef.current.value;
  
      if (name !== "") {
        const joinCodeParty = Math.floor(Math.random() * 999999).toString();
  
        let partyId = await addPartyAcess(joinCodeParty);
  
        const player: Player = {
          name: name,
          partyId: partyId,
          leader: true,
          status: "Ready",
          cards: [],
          coins: 2
        }
        
        let playerId = await addPlayersAcess(player);
  
        await addPlayertoParty(partyId, player);

        updateContext(playerId);
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
            const player: Player = {
                name: name,
                partyId: partyId,
                leader: false,
                status: "Not Ready",
                cards: [],
                coins: 2
            }

            let playerId = await addPlayersAcess(player);

            await addPlayertoParty(partyId, player);

            updateContext(playerId);
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
}