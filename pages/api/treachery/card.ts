import { NextApiRequest, NextApiResponse } from 'next'

import { readRooms, parseCardData } from '../../../utilities/helpers/treachery'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { roomCode, id } = req.body as { roomCode: string; id: string }
  const rooms = readRooms()

  const idx = rooms[roomCode].ids[id]
  const cardPath = rooms[roomCode].cards[idx]
  const parsed = parseCardData(cardPath)

  res.send(parsed)
}

export default api
