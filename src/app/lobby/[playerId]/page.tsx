"use client"

import Lobby from "@/app/routers/Lobby";
import { useState } from "react";

function App() {
    const [partyStage, setPartyStage] = useState("queue");

    function partyStarted(stage: string) {
        setPartyStage(stage);
        
        if (stage == "In preparation") {
        }
    }

    return (
        <div>
            {
                partyStage == "queue" &&
                <Lobby partyStarted={partyStarted} />
            }
            {
                partyStage != "queue" &&
                <h1>{partyStage}</h1>
            }
        </div>
    )
}

export default App;