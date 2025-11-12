import { NextApiRequest, NextApiResponse } from "next";

import { changePassword } from "./helpers";

const api = async (req: NextApiRequest, res: NextApiResponse & Locals) => {
  const { password } = req.body as { password: string };

  try {
    const result = changePassword(password, res.locals.user);
    if (typeof result !== "string") {
      res.send({});
      return;
    }

    res.status(400).send(result);
  } catch (err) {
    res.status(500).send((err as Error).message);
    console.error("Error changing password: ", err);
  }
};

export default api;
