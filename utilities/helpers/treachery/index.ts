import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import { Rooms } from "../../../shared/treachery";
import { Roles, WinConditions } from "./types";

const ROLES: Roles = JSON.parse(
  (fs.readFileSync("public/treacheryRoles.json") as unknown) as string
);
const WIN_CONDITIONS: WinConditions = JSON.parse(
  (fs.readFileSync("public/treacheryWinConditions.json") as unknown) as string
);
const ROOM_PATH: string = "public/treacheryRooms.json";

export const readRooms = (): Rooms =>
  JSON.parse((fs.readFileSync(ROOM_PATH) as unknown) as string);

export const writeRooms = (rooms: Rooms): void =>
  fs.writeFileSync(ROOM_PATH, JSON.stringify(rooms));

export const send = (res: NextApiResponse, data) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data));
};

export const generateUniqueCode = (codeSet: { [x: string]: any }): string => {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  if (code in codeSet) {
    return generateUniqueCode(codeSet);
  } else {
    return code;
  }
};

const chooseN = (cardType, rarity, amount) => {
  const chosen = [];
  const cards = ROLES[cardType][rarity];
  while (chosen.length != amount) {
    const item = `/treachery/${cardType}/${rarity}/${
      cards[Math.floor(Math.random() * cards.length)]
    }`;
    if (!chosen.includes(item)) {
      chosen.push(item);
    }
  }
  return chosen;
};

const shuffle = (array) => {
  let curr = array.length;

  while (0 !== curr) {
    const rand = Math.floor(Math.random() * curr);
    curr -= 1;

    const temp = array[curr];
    array[curr] = array[rand];
    array[rand] = temp;
  }

  return array;
};

export const getCards = (numPlayers, rarity) => {
  let chosen = chooseN("Leader", rarity, 1);

  if (numPlayers === 8) {
    chosen = chosen.concat(chooseN("Traitor", rarity, 2));
  } else {
    chosen = chosen.concat(chooseN("Traitor", rarity, 1));
  }

  if (numPlayers >= 6) {
    chosen = chosen.concat(chooseN("Assassin", rarity, 3));
  } else {
    chosen = chosen.concat(chooseN("Assassin", rarity, 2));
  }

  if (numPlayers >= 7) {
    chosen = chosen.concat(chooseN("Guardian", rarity, 2));
  } else if (numPlayers >= 5) {
    chosen = chosen.concat(chooseN("Guardian", rarity, 1));
  }

  return shuffle(chosen);
};

export const parseCardData = (card) => {
  const imgSrc = card;
  const role = card.split("/")[2];
  const winCondition = WIN_CONDITIONS[role];
  return { imgSrc: imgSrc, role: role, winCondition: winCondition };
};
