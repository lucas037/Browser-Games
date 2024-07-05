import { Card } from "./CardType"

export type Player = {
  name: string,
  leader: boolean,
  partyId: string,
  status: string,
  cards: Card[],
  coins: number
}