import { addRoom, getRooms } from "./state";
import { send } from "./index";

const getUniqueRoomCode = () => {
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    if (code in getRooms()) {
        return getUniqueRoomCode();
    } else {
        return code;
    }
};

const getCards = (numPlayers, rarity) => {
    return ["asd", "evgh", "asfdg"];
};

export default (req, res) => {
    const { numPlayers, rarity } = req.query;

    if (!numPlayers || !rarity) {
        send(res, { error: "Missing params for room creation" });
    } else {
        const roomCode = getUniqueRoomCode();

        addRoom(roomCode, {
            numPlayers: numPlayers,
            rarity: rarity,
            cards: getCards(numPlayers, rarity),
        });

        send(res, { roomCode: roomCode });
    }
};
