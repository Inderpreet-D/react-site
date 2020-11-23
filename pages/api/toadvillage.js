import fs from "fs";
import axios from "axios";

const STORAGE_PATH = "public/scryfall.json";
let ALL_CARDS = {};
if (fs.existsSync(STORAGE_PATH)) {
  ALL_CARDS = JSON.parse(fs.readFileSync(STORAGE_PATH));
} else {
  const dateOffset = 24 * 60 * 60 * 1000 * 90; // 3 months
  const oldDate = new Date();
  oldDate.setTime(oldDate.getTime() - dateOffset);
  ALL_CARDS.lastUpdate = oldDate;
}

const sendData = (res, data) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(data);
};

const fetchCards = () => {
  return new Promise((resolve, _reject) => {
    const lastMonth = new Date();
    const monthAgo = 24 * 60 * 60 * 1000 * 30;
    lastMonth.setTime(lastMonth.getTime() - monthAgo);

    if (ALL_CARDS.lastUpdate > monthAgo) {
      console.log("Old cards, refreshing");
      axios.get("https://api.scryfall.com/bulk-data").then((bulk) => {
        const oracle = bulk.data.data.find((d) => d.type === "oracle_cards");
        setTimeout(() => {
          axios.get(oracle.download_uri).then((cards) => {
            ALL_CARDS = { lastUpdate: new Date(), cards: cards.data };
            fs.writeFile(STORAGE_PATH, JSON.stringify(ALL_CARDS), (err) => {
              if (err) throw err;
            });
            resolve(ALL_CARDS.cards);
          });
        }, 100);
      });
    } else {
      console.log("Still fresh");
      resolve(ALL_CARDS.cards);
    }
  });
};

const matchCards = (names, cards) => {
  return names.map(({ amount, name }) => {
    const card = cards.find((card) => card.name === name);
    return { amount, card };
  });
};

const getColorIdentity = (cards) => {
  const identity = new Set();
  cards.forEach(({ card }) => {
    card.color_identity.forEach((color) => identity.add(color));
  });
  return identity;
};

const isCommander = (deckIdentity, card) => {
  if (!card.type_line.startsWith("Legendary Creature")) {
    return false;
  }

  const cardIdentity = new Set(card.color_identity);
  if (deckIdentity.size !== cardIdentity.size) {
    return false;
  }
  for (let color of deckIdentity) {
    if (!cardIdentity.has(color)) {
      return false;
    }
  }

  return true;
};

const formatCard = (card) => {
  const newCard = { ...card };
  return newCard;
};

const formatCards = (cards, identity) => {
  const commanders = [];
  const others = [];

  cards.forEach(({ amount, card }) => {
    const formatted = formatCard(card);
    const val = { amount, card: formatted };
    if (isCommander(identity, card)) {
      commanders.push(val);
    } else {
      others.push(val);
    }
  });

  return { commanders, others };
};

export default async (req, res) => {
  const { cards: names } = req.query;
  const cardNames = JSON.parse(names);

  const cards = await fetchCards();
  const matchedCards = matchCards(cardNames, cards);

  const identity = getColorIdentity(matchedCards);
  const { commanders, others } = formatCards(matchedCards, identity);

  // const card = cards.find((card) => card.name === cardNames[0]);
  // const images = card.image_uris || card.card_faces[0].image_uris;
  // console.log("Found", cardNames[0], images.large);

  const resData = { commanders, others };
  sendData(res, resData);
};
