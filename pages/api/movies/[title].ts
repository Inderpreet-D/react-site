import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query;

  try {
    const data = await axios.get(`http://www.omdbapi.com/?t=${title}`);
    res.send({ data });
  } catch (err) {
    res.send(null);
  }
};

export default api;
