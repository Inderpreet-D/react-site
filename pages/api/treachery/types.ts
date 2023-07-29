import { Card, Rarity } from '../../../shared/treachery'

export type Payload = {
  numPlayers?: number
  rarity?: Rarity
  roomCode?: string
  id?: string
}

type ErrorVal = {
  error: string
}

type JoinData = {
  roomCode: string
  id: string
  numPlayers: number
  currentPlayers: number
}

export type JoinVal = ErrorVal | JoinData

export type ApiRequest = Payload & { action: string }

export type RoomResponse = {
  numPlayers: number
  currentPlayers: number
}

export type CardResponse = Card

export type JoinResponse = ErrorVal & JoinData

export type CreateResponse = {
  roomCode: string
  id: string
}
