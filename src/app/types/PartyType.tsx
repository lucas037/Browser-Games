import { Player } from "./PlayerType"

export type Party = {
    joinCode: number,
    stage: string,
    players: Player[]
}