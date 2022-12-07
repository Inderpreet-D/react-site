import { NextApiRequest, NextApiResponse } from 'next'

import { readRooms } from '../../../utilities/helpers/treachery'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { roomCode } = req.body as { roomCode: string }
  const rooms = readRooms()

  const { numPlayers, currentPlayers } = rooms[roomCode]

  res.send({ numPlayers, currentPlayers })
}

export default api
