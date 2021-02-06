import axios from "axios";

export default async (req, res) => {
  const response = await axios.get("https://www.reddit.com/r/poetry/hot.json");

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(response.data);
};
