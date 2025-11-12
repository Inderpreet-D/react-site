import { NextApiRequest, NextApiResponse } from "next";

import { Season } from "../../../components/pages/Competitive";
import { get } from "../../../utilities/helpers/database";

const URL = "competitive";

export const getSeasons = async () => {
  return await get<Season[]>(URL);
};

const api = async (_: NextApiRequest, res: NextApiResponse) => {
  const seasons = await getSeasons();
  res.send(seasons);
};

export default api;
