const rooms = {};

export const addRoom = (roomCode, data) => {
    rooms[roomCode] = { ...data };
};

export const getRooms = () => {
    return rooms;
};
