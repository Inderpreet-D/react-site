import rooms from "./state";
import { send } from "./index";

const getUniqueRoomCode = () => {
    let code;
    for (let i = 0; i < 4; i++) {
        code += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    if (code in rooms) {
        return getUniqueRoomCode();
    }
    return code;
};

export default (req, res) => {
    const { numPlayers, rarity } = req.query;
    const result = {};
    const roomCode = getUniqueRoomCode();
    result.roomCode = roomCode;
    send(res, result);
};
