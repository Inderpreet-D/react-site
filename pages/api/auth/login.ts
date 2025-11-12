import { NextApiRequest, NextApiResponse } from "next";

import { createToken, getUserByName, validateUser } from "./helpers";

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  try {
    if (await validateUser(username, password)) {
      const user = await getUserByName(username);
      if (user) {
        const token = await createToken(user.id);
        res.send({ token });
        return;
      }
    }

    res.status(400).send("Username or password is incorrect.");
  } catch (err) {
    console.error("Error logging in: ", err);
    res.status(500).send((err as Error).message);
  }
};

export default api;
