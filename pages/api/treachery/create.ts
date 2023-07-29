import { NextApiRequest, NextApiResponse } from 'next'

import { Rarity } from '../../../shared/treachery'

import { getRooms, saveRooms } from './helpers/storage'
import { generateUniqueCode, getCards } from './helpers'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { numPlayers, rarity } = req.body as {
    numPlayers: number
    rarity: string
  }
  const rooms = await getRooms()

  const roomCode = generateUniqueCode(Object.keys(rooms))
  const id = generateUniqueCode()

  const newRoom: Room = {
    numPlayers,
    currentPlayers: 1,
    cards: await getCards(numPlayers, rarity as Rarity),
    ids: { [id]: 0 },
    nextIDX: 1
  }

  rooms[roomCode] = newRoom
  await saveRooms(rooms)

  res.send({ roomCode, id })
}

export default api
