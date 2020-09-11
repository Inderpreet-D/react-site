import fs from "fs";

import { addRoom, getRooms } from "./state";
import { send } from "./index";

const roles = JSON.parse(fs.readFileSync("public/treacheryRoles.json"));

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

const chooseN = (cardType, rarity, amount) => {
    const chosen = [];
    const cards = roles[cardType][rarity];
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

const getCards = (numPlayers, rarity) => {
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

export default (req, res) => {
    const { numPlayers, rarity } = req.query;

    if (!numPlayers || !rarity) {
        send(res, { error: "Missing params for room creation" });
    } else {
        const roomCode = getUniqueRoomCode();

        addRoom(roomCode, {
            numPlayers: +numPlayers,
            currentPlayers: 1,
            cards: getCards(numPlayers, rarity),
        });

        send(res, { roomCode: roomCode });
    }
};
