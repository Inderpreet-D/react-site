import fs from "fs";

import * as helpers from "./helper";

const ROOM_PATH = "public/treacheryRooms.json";

const readRooms = () => {
  return JSON.parse(fs.readFileSync(ROOM_PATH));
};

const writeRooms = (rooms) => {
  fs.writeFileSync(ROOM_PATH, JSON.stringify(rooms));
};

const handleRoomCreation = (payload, rooms) => {
  const { numPlayers, rarity } = payload;

  const roomCode = helpers.getUniqueRoomCode(rooms);
  const id = helpers.getUniqueRoomCode({});

  rooms[roomCode] = {
    numPlayers: +numPlayers,
    currentPlayers: 1,
    cards: helpers.getCards(numPlayers, rarity),
    ids: { [id]: 0 },
    nextIDX: 1,
  };

  writeRooms(rooms);

  return { roomCode: roomCode, id: id };
};

const handleRoomJoin = (payload, rooms) => {
  const { roomCode, id } = payload;

  if (!(roomCode in rooms)) {
    return { error: "Room not found" };
  }

  const ids = rooms[roomCode].ids;
  if (!id) {
    const newId = helpers.getUniqueRoomCode(ids);
    rooms[roomCode].ids[newId] = rooms[roomCode].nextIDX;
    rooms[roomCode].nextIDX++;
    rooms[roomCode].currentPlayers++;
    writeRooms(rooms);
    return {
      roomCode: roomCode,
      id: newId,
      currentPlayers: rooms[roomCode].currentPlayers,
      numPlayers: rooms[roomCode].numPlayers,
    };
  }

  return {
    roomCode: roomCode,
    id: id,
    currentPlayers: rooms[roomCode].currentPlayers,
    numPlayers: rooms[roomCode].numPlayers,
  };
};

const handleRoomPing = (payload, rooms) => {
  const { roomCode } = payload;
  const { numPlayers, currentPlayers } = rooms[roomCode];
  return { numPlayers: numPlayers, currentPlayers: currentPlayers };
};

export default (req, res) => {
  const { action, ...payload } = req.query;
  const rooms = readRooms();

  let result;
  if (!action) {
    result = rooms;
  } else if (action === "create") {
    result = handleRoomCreation(payload, rooms);
    console.log("Created", rooms);
  } else if (action === "join") {
    result = handleRoomJoin(payload, rooms);
  } else if (action === "room") {
    result = handleRoomPing(payload, rooms);
  }

  helpers.send(res, result);
};
