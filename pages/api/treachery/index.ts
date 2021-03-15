import { NextApiRequest, NextApiResponse } from "next";

import {
  generateUniqueCode,
  getCards,
  writeRooms,
  parseCardData,
  readRooms,
  send,
} from "../../../utilities/helpers/treachery";

import { Card, Room, Rooms } from "../../../shared/treachery";
import { Payload, JoinVal } from "./types";

const handleRoomCreation = (
  payload: Payload,
  rooms: Rooms
): { roomCode: string; id: string } => {
  const { numPlayers, rarity } = payload;

  const roomCode = generateUniqueCode(rooms);
  const id = generateUniqueCode({});

  const newRoom: Room = {
    numPlayers: +numPlayers,
    currentPlayers: 1,
    cards: getCards(numPlayers, rarity),
    ids: { [id]: 0 },
    nextIDX: 1,
  };

  rooms[roomCode] = newRoom;
  writeRooms(rooms);

  return { roomCode, id };
};

const handleRoomJoin = (payload: Payload, rooms: Rooms): JoinVal => {
  const { roomCode, id } = payload;

  if (!(roomCode in rooms)) {
    return { error: "Room not found" };
  }

  const ids = rooms[roomCode].ids;
  const returnVal: JoinVal = {
    roomCode,
    id,
    currentPlayers: 0,
    numPlayers: 0,
  };

  if (!id || !(id in ids)) {
    const newId = generateUniqueCode(ids);

    rooms[roomCode].ids[newId] = rooms[roomCode].nextIDX;
    rooms[roomCode].nextIDX++;
    rooms[roomCode].currentPlayers++;

    writeRooms(rooms);

    returnVal.id = newId;
  }

  returnVal.currentPlayers = rooms[roomCode].currentPlayers;
  returnVal.numPlayers = rooms[roomCode].numPlayers;

  return returnVal;
};

const handleRoomPing = (
  payload: Payload,
  rooms: Rooms
): { numPlayers: number; currentPlayers: number } => {
  const { roomCode } = payload;
  const { numPlayers, currentPlayers } = rooms[roomCode];

  return { numPlayers, currentPlayers };
};

const handleCard = (payload: Payload, rooms: Rooms): Card => {
  const { roomCode, id } = payload;

  const idx = rooms[roomCode].ids[id];
  const cardPath = rooms[roomCode].cards[idx];
  const parsed = parseCardData(cardPath);

  return parsed;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { action, ...others } = req.query;
  const payload: Payload = others as Payload;
  const rooms: Rooms = readRooms();

  let result: any;
  if (!action) {
    result = rooms;
  } else if (action === "create") {
    result = handleRoomCreation(payload, rooms);
  } else if (action === "join") {
    result = handleRoomJoin(payload, rooms);
  } else if (action === "room") {
    result = handleRoomPing(payload, rooms);
  } else if (action === "card") {
    result = handleCard(payload, rooms);
  }

  send(res, result);
};
