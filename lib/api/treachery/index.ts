import {
  CreateResponse,
  RoomResponse,
  CardResponse,
  JoinResponse
} from '../../../pages/api/treachery/types'

import qs from 'qs'
import axios from 'axios'

const getUrl = (params: any) => {
  const paramString = qs.stringify(params, { addQueryPrefix: true })
  return `/api/treachery${paramString}`
}

export const createRoom = async (numPlayers: number, rarity: string) => {
  const params = { action: 'create', numPlayers, rarity }
  const uri = getUrl(params)
  const data = await axios.get(uri)
  return (data.data as unknown) as CreateResponse
}

export const waitRoom = async (roomCode: string) => {
  const params = { action: 'room', roomCode }
  const uri = getUrl(params)
  const data = await axios.get(uri)
  return (data.data as unknown) as RoomResponse
}

export const getCard = async (roomCode: string, id: string) => {
  const params = { action: 'card', roomCode, id }
  const uri = getUrl(params)
  const data = await axios.get(uri)
  return (data.data as unknown) as CardResponse
}

export const joinRoom = async (roomCode: string, id: string) => {
  const params = { action: 'join', roomCode, id }
  const uri = getUrl(params)
  const data = await axios.get(uri)
  return (data.data as unknown) as JoinResponse
}
