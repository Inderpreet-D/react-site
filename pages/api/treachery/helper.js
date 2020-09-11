import fs from "fs";

const roles = JSON.parse(fs.readFileSync("public/treacheryRoles.json"));

export const send = (res, data) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data));
};

export const getUniqueRoomCode = (rooms) => {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  if (code in rooms) {
    return getUniqueRoomCode(rooms);
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

export const getCards = (numPlayers, rarity) => {
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
