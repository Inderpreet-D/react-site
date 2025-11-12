import { NextApiRequest, NextApiResponse } from "next";

import { getRooms } from "./helpers/storage";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { roomCode } = req.body as { roomCode: string };
  const rooms = await getRooms();

  const { numPlayers, currentPlayers } = rooms[roomCode];

  res.send({ numPlayers, currentPlayers });
};

export default api;
