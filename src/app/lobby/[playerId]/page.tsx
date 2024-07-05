"use client"

import Lobby from "@/app/routers/Lobby";
import { getPartyById, updateParty } from "@/app/services/dataAcess/partyAcess";
import { Card } from "@/app/types/CardType";
import { Party } from "@/app/types/PartyType";
import { Player } from "@/app/types/PlayerType";
import { useEffect, useState } from "react";

const cards: Record<string, string> = {
    Contessa: "https://i.imgur.com/I00Uogf.png",
    Duke: "https://i.imgur.com/9EOacO5.png",
    Assassin: "https://i.imgur.com/zVwtWjp.png",
    Ambassador: "https://i.imgur.com/WkDeI9j.png",
    Captain: "https://i.imgur.com/h7nErOD.png",
  };

function App() {
    const [party, setParty] = useState<Party>();
    const [player, setPlayer] = useState<Player>();
    const [indexPlayer, setIndexPlayer] = useState(10);

    useEffect(() => {
    })

    // aleatoriza um array de strings
    function shuffleString(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // recebe a informação de que os players iniciaram a partida
    async function partyStarted(party: Party, player: Player, indexPlayer: number) {
        setParty(party);
        setPlayer(player);
        setIndexPlayer(indexPlayer);

        if (party != null && player != null && party.stage === "in-preparation-leader" && player.leader) {
            cardsDistribution(party, player);
        }
    }

    // distribui as cartas entre os jogadores
    async function cardsDistribution(party: Party, player: Player) {
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
            party.players[i].status = "Not Ready";
        }

        party.stage = "in-game";
        setParty(party);
        updateParty(player.partyId, party);
    }

    async function getCards(party: Party, player: Player) {
        const copyParty: Party | null = await getPartyById(player.partyId);

        if (copyParty != null && copyParty.players[indexPlayer] != null) {
            copyParty.players[indexPlayer].status = "Ready";
            updateParty(player.partyId, copyParty);
            setParty(copyParty);
            setPlayer(party.players[indexPlayer]);
        }
    }

    return (
        <div>
            {
                party == null &&
                <Lobby partyStarted={partyStarted} />
            }
            {
                party != null && player != null && party.stage == "in-game" &&
                <div className="h-screen flex justify-center gap-2 items-end">
                    <img src={cards[`${party.players[indexPlayer].cards[0].name}`]} className="h-1/3 mb-2"/>
                    <img src={cards[`${party.players[indexPlayer].cards[1].name}`]} className="h-1/3 mb-2"/>
                </div>
            }
        </div>
    )
}

export default App;