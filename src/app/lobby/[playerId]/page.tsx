"use client"

import { getPartyById, updateParty } from "@/app/services/dataAcess/partyAcess";
import { getPlayerById } from "@/app/services/dataAcess/playersAcess";
import { Party } from "@/app/types/PartyType";
import { Player } from "@/app/types/PlayerType";
import { useEffect, useState } from "react";


function App() {
    const path = window.location.pathname;

    const idPlayer = path.split('/').pop();
    let [player, setPlayer] = useState<Player>();
    let [allPlayers, setAllPlayers] = useState<Player[]>();
    let [party, setParty] = useState<Party>();

    useEffect(() => {
    async function getPlayers(idPlayer: string) {
        let player: Player | null = await getPlayerById(idPlayer);

        if (player != null) {
        setPlayer(player);

        const party: Party | null = await getPartyById(player.partyId);

        let allPlayers: Player[] | null;
        if (party != null) {
            setParty(party);
            allPlayers = party.players;
            setAllPlayers(allPlayers);
        }
        }
    }

    if (idPlayer != null)
        getPlayers(idPlayer);
    })

    function changeStatusPlayer() {
    let copyParty = party;

    if (copyParty != null && copyParty.players != null && player != null) {
        for (let i = 0; i < copyParty.players.length; i++) {
        if (copyParty.players[i].name == player.name) {
            if (copyParty.players[i].status == "Not Ready")
            copyParty.players[i].status = "Ready";
            else 
            copyParty.players[i].status = "Not Ready";

            updateParty(player.partyId, copyParty);
        }
        }
    }

    }

    return (
    <div className="">
        {player &&
        <div className="bg-white w-screen h-screen flex flex-col items-center justify-around">
            <div className=" text-black text-xl flex flex-col gap-1">
            
            {allPlayers && <div className="flex flex-col gap-1">
                {allPlayers.map((actualPlayer, index) => (
                <div key={index} className="flex gap-1">
                    <div className="bg-[#182237] text-white flex justify-center items-center border-2 w-[350px] h-12 gap-1 text-2xl">{actualPlayer.name}</div>
                    { // caso o jogador não seja o líder, será mostrado se está pronto
                    !actualPlayer.leader && <div className="bg-[#182237] text-white w-[200px] h-12 flex justify-center items-center">
                    {
                        actualPlayer.name == player.name && <button onClick={changeStatusPlayer}><div>{actualPlayer.status}</div></button>
                    }
                    {
                        actualPlayer.name != player.name && <div>{actualPlayer.status}</div>
                    }
                    </div>
                    }
                    { // caso o jogador seja o líder, será informado que é o líder
                    actualPlayer.leader && <div className="bg-[#182237] text-white w-[200px] h-12 flex justify-center items-center">⭐</div>
                    }
                </div>
                ))}
                
                {Array.from({ length: (8-allPlayers.length) }).map((_, index) => (
                <div key={index} className="flex gap-1">
                <div className="bg-[#182237] text-white flex justify-center items-center border-2 w-[350px] h-12 gap-2"></div>
                <div className="bg-[#182237] text-white w-[200px] h-12 flex justify-center items-center"></div>
                </div>
    ))}
            </div>}
            

            </div>

            {party != null && <div className="text-black">
            {party.joinCode}
            </div>
            }
        </div>}
    </div>
    );
}

export default App;