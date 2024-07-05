"use client"

import Lobby from "@/app/routers/Lobby";
import { getPartyById, updateParty } from "@/app/services/dataAcess/partyAcess";
import { Card } from "@/app/types/CardType";
import { Party } from "@/app/types/PartyType";
import { Player } from "@/app/types/PlayerType";
import { useEffect, useState } from "react";

function App() {
    const [party, setParty] = useState<Party>();
    const [player, setPlayer] = useState<Player>();
    const [indexPlayer, setIndexPlayer] = useState(10);

    useEffect(() => {
        if (party != null && player != null) {
            console.log(party.stage);
            if (indexPlayer == 10) {
                for (let i = 0; i < party.players.length; i++) {
                    if (player.name == party.players[i].name)
                        setIndexPlayer(i);
                }
            }
            if (party.stage == "in-preparation-leader" && player.leader) {
                cardsDistribution(party, player);
            }
            else if (party.stage == "in-preparation-players") {
                getCards(party, player);

                if (player.leader) {
                    checkPreparationPlayers(party, player);
                }

            }
        }

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
    function partyStarted(party: Party, player: Player) {
        setParty(party);
        setPlayer(player);
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

        party.stage = "in-preparation-players";
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

    async function checkPreparationPlayers(party: Party, player: Player) {
        const copyParty: Party | null = await getPartyById(player.partyId);


        if (copyParty != null) {
            let isTrue = true;

            for (let i = 0; i < copyParty.players.length; i++) {
                if (copyParty.players[i].status == "Not Ready")
                    isTrue = false;
            }

            if (isTrue) {
                copyParty.stage = "in-game";
                updateParty(player.partyId, copyParty);
            }
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
                <h1 className="w-screen h-screen flex justify-center items-center text-2xl">{player.cards[0]?.name} / {player.cards[1]?.name}</h1>
            }
        </div>
    )
}

export default App;