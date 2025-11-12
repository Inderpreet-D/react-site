import { NextApiRequest, NextApiResponse } from "next";

import { ReqCard } from "../../../shared/toadvillage";
import { QueueType } from "./types";

import handleRequest from "./helpers";

const QUEUE: { [id: string]: QueueType } = {};
const STARTED: Set<string> = new Set<string>();

const api = async (req: NextApiRequest, res: NextApiResponse & Locals) => {
  const cardNames: ReqCard[] = req.body.cards;
  const id = res.locals.token;

  if (!id) {
    res.status(400).send("User could not be found.");
    return;
  }

  // Normal download request case
  if (cardNames) {
    STARTED.add(id);
    res.status(200).send({ status: "POLL" });
    QUEUE[id] = await handleRequest(cardNames);
    return;
  }

  // Done dowloading
  if (id in QUEUE) {
    res.status(200).send(QUEUE[id]);
    STARTED.delete(id);
    delete QUEUE[id];
    return;
  }

  // Continues polling
  if (STARTED.has(id)) {
    res.status(200).send({ status: "WAIT" });
    return;
  }

  // Finished polling, no results
  res.status(200).send({
    status: "DONE",
    commanders: [],
    others: [],
    tokens: [],
    unmatched: [],
  });
  STARTED.delete(id);
};

export default api;
