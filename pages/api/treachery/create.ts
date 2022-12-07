import { NextApiRequest, NextApiResponse } from 'next'

import { Room, Rarity } from '../../../shared/treachery'

import {
  readRooms,
  generateUniqueCode,
  getCards,
  writeRooms
} from '../../../utilities/helpers/treachery'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { numPlayers, rarity } = req.body as {
    numPlayers: number
    rarity: string
  }
  const rooms = readRooms()

  const roomCode = generateUniqueCode(rooms)
  const id = generateUniqueCode({})

  const newRoom: Room = {
    numPlayers,
    currentPlayers: 1,
    cards: getCards(numPlayers, rarity as Rarity),
    ids: { [id]: 0 },
    nextIDX: 1
  }

  rooms[roomCode] = newRoom
  writeRooms(rooms)

  res.send({ roomCode, id })
}

export default api
