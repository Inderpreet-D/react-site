export default (req, res) => {
    const { roomCode } = req.query;
    const room = rooms[roomCode] || {};
    console.log(rooms);
    send(res, room);
};
