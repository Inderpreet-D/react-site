import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { RedditRawResponse, RedditResponse } from "../../../shared/reddit";

const URL = "https://www.reddit.com/r/poetry/hot.json";

const api = async (_: NextApiRequest, res: NextApiResponse) => {
  const response: RedditRawResponse = await axios.get(URL);
  const data: RedditResponse = response.data;
  res.send(data);
};

export default api;
