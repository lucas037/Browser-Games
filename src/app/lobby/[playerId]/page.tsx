"use client"

import Lobby from "@/app/routers/Lobby";
import { updateParty } from "@/app/services/dataAcess/partyAcess";
import { Card } from "@/app/types/CardType";
import { Party } from "@/app/types/PartyType";
import { Player } from "@/app/types/PlayerType";
import { useState } from "react";

function App() {
    const [partyStage, setPartyStage] = useState("queue");
    const [party, setParty] = useState<Party>();

    function shuffleString(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function partyStarted(party: Party, player: Player) {

        setPartyStage(party.stage);

        if (party.stage == "In preparation" && player.leader) {
            let cards: string[] = [];
            let uniqueCards = [
                "Contessa", "Duke", "Captain", "Ambassador", "Assassin"
            ]

            uniqueCards.forEach(card => {
                for (let i = 0; i < 5; i++) {
                    cards.push(card);
                }
            })

            cards = shuffleString(cards);
            
            for (let i = 0; i < party.players.length; i++) {
                const card1: Card = {
                    name: cards[i*2],
                    alive: true
                }

                const card2: Card = {
                    name: cards[i*2+1],
                    alive: true
                }

                party.players[i].cards = [card1, card2];
            }

            party.stage = "in-game";
            setParty(party);
            updateParty(player.partyId, party);
        }
    }

    return (
        <div>
            {
                partyStage == "queue" &&
                <Lobby partyStarted={partyStarted} />
            }
            {
                partyStage == "in-game" &&
                <h1 className="w-screen h-screen flex justify-center items-center text-2xl">{party?.players[0].cards[0].name} / {party?.players[0].cards[1].name}</h1>
            }
        </div>
    )
}

export default App;