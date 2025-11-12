import { Rarity, RoleName } from "../../../../shared/treachery";

import { get, set } from "../../../../utilities/helpers/database";

type Cards = {
  [x in Rarity]: string[];
};

type Roles = {
  [x in RoleName]: Cards;
};

type WinConditions = {
  [x in RoleName]: string;
};

//* Rooms

const BASE_PATH = "treachery";
const ROOM_PATH = `${BASE_PATH}/rooms`;
const ROLES_PATH = `${BASE_PATH}/roles`;
const WINS_PATH = `${BASE_PATH}/winConditions`;

export const getRooms = async () => {
  const rooms = await get<Rooms>(ROOM_PATH);
  return rooms ?? ({} as Rooms);
};

export const saveRooms = async (rooms: Rooms) => {
  await set(ROOM_PATH, rooms);
};

//* Roles

export const getRoles = async () => {
  const roles = await get<Roles>(ROLES_PATH);
  return roles!;
};

//* Win Conditions

export const getWinConditions = async () => {
  const conditions = await get<WinConditions>(WINS_PATH);
  return conditions!;
};
