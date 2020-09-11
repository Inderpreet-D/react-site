import { getRooms } from "./state";
import { send } from "./index";

export default (req, res) => {
    const { roomCode } = req.query;
    const room = getRooms()[roomCode];
    send(res, room);
};
