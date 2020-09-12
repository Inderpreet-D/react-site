import * as helpers from "./helper";

const handleRoomCreation = (payload, rooms) => {
  const { numPlayers, rarity } = payload;

  const roomCode = helpers.generateUniqueCode(rooms);
  const id = helpers.generateUniqueCode({});

  rooms[roomCode] = {
    numPlayers: +numPlayers,
    currentPlayers: 1,
    cards: helpers.getCards(numPlayers, rarity),
    ids: { [id]: 0 },
    nextIDX: 1,
  };

  helpers.writeRooms(rooms);

  return { roomCode: roomCode, id: id };
};

const handleRoomJoin = (payload, rooms) => {
  const { roomCode, id } = payload;

  if (!(roomCode in rooms)) {
    return { error: "Room not found" };
  }

  const ids = rooms[roomCode].ids;
  if (!id || !(id in ids)) {
    const newId = helpers.generateUniqueCode(ids);
    rooms[roomCode].ids[newId] = rooms[roomCode].nextIDX;
    rooms[roomCode].nextIDX++;
    rooms[roomCode].currentPlayers++;
    helpers.writeRooms(rooms);
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

const handleCard = (payload, rooms) => {
  const { roomCode, id } = payload;
  const idx = rooms[roomCode].ids[id];
  const cardPath = rooms[roomCode].cards[idx];
  const parsed = helpers.parseCardData(cardPath);
  return parsed;
};

export default (req, res) => {
  const { action, ...payload } = req.query;
  const rooms = helpers.readRooms();

  let result;
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

  helpers.send(res, result);
};
