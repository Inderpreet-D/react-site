import { NextApiRequest, NextApiResponse } from 'next'

import { JoinVal } from './types'

import {
  readRooms,
  generateUniqueCode,
  writeRooms
} from '../../../utilities/helpers/treachery'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { roomCode, id } = req.body as { roomCode: string; id?: string }
  const rooms = readRooms()

  if (!(roomCode in rooms)) {
    res.send({ error: 'Room not found' })
    return
  }

  const ids = rooms[roomCode].ids
  const returnVal: JoinVal = {
    roomCode,
    id: id ?? '',
    currentPlayers: 0,
    numPlayers: 0
  }

  if (!id || !(id in ids)) {
    const newId = generateUniqueCode(ids)

    rooms[roomCode].ids[newId] = rooms[roomCode].nextIDX
    rooms[roomCode].nextIDX++
    rooms[roomCode].currentPlayers++

    writeRooms(rooms)

    returnVal.id = newId
  }

  returnVal.currentPlayers = rooms[roomCode].currentPlayers
  returnVal.numPlayers = rooms[roomCode].numPlayers

  res.send(returnVal)
}

export default api
