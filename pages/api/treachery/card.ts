import { NextApiRequest, NextApiResponse } from 'next'

import { getRooms } from './helpers/storage'
import { parseCardData } from './helpers'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { roomCode, id } = req.body as { roomCode: string; id: string }
  const rooms = await getRooms()

  const idx = rooms[roomCode].ids[id]
  const cardPath = rooms[roomCode].cards[idx]
  const parsed = await parseCardData(cardPath)

  res.send(parsed)
}

export default api
