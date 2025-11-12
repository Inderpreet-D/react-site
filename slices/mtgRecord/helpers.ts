import { v4 as uuidv4 } from "uuid";

export type Player = {
  name: string;
  commander: string;
  theme: string;
  tribe: string;
  companion: string;
};

export type Players = Record<string, Player>;

export const makePlayer = (name: string = ""): Player => ({
  name,
  commander: "",
  theme: "",
  tribe: "",
  companion: "",
});

export const getDefaultPlayers = (): Players => {
  return {
    [uuidv4()]: makePlayer("Alberto"),
    [uuidv4()]: makePlayer("Gary"),
    [uuidv4()]: makePlayer("Inderpreet"),
    [uuidv4()]: makePlayer("Richard"),
  };
};
