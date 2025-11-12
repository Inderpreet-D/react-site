import { NextApiRequest, NextApiResponse } from "next";

import { changeUsername, isNameAvailable } from "./helpers";

const api = async (req: NextApiRequest, res: NextApiResponse & Locals) => {
  const { name } = req.body as { name: string };
  const { user } = res.locals;

  if (!user) {
    res.status(400).send("User could not be found.");
    return;
  }

  try {
    const isValid = await isNameAvailable(name, user.id);

    if (!isValid) {
      res.status(400).send("Username is not valid.");
      return;
    }

    const fullUser = await changeUsername(user, name);

    if (typeof fullUser !== "string") {
      res.send({ user: fullUser });
      return;
    }

    res.status(400).send(fullUser);
  } catch (err) {
    console.error("Error changing username: ", err);
    res.status(500).send((err as Error).message);
  }
};

export default api;
