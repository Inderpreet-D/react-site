import qs from 'qs'

import { wrapCall } from '..'

import {
  CreateResponse,
  RoomResponse,
  CardResponse,
  JoinResponse
} from '../../../pages/api/treachery/types'

const getUrl = (params: any) => {
  const paramString = qs.stringify(params, { addQueryPrefix: true })
  return `/treachery${paramString}`
}

export const createRoom = async (numPlayers: number, rarity: string) => {
  const data = await wrapCall<CreateResponse>({
    method: 'GET',
    uri: getUrl({ action: 'create', numPlayers, rarity })
  })
  return data
}

export const waitRoom = async (roomCode: string) => {
  const data = await wrapCall<RoomResponse>({
    method: 'GET',
    uri: getUrl({ action: 'room', roomCode })
  })
  return data
}

export const getCard = async (roomCode: string, id: string) => {
  const data = await wrapCall<CardResponse>({
    method: 'GET',
    uri: getUrl({ action: 'card', roomCode, id })
  })
  return data
}

export const joinRoom = async (roomCode: string, id: string) => {
  const data = await wrapCall<JoinResponse>({
    method: 'GET',
    uri: getUrl({ action: 'join', roomCode, id })
  })
  return data
}
