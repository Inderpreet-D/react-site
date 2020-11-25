import axios from "axios";

const fetchCards = async (cards) => {
  const matchedCards = [];
  const unmatched = [];
  const tokens = [];

  for (let { amount, name } of cards) {
    try {
      const card = await new Promise(async (resolve, reject) => {
        setTimeout(async () => {
          try {
            const result = await axios.get(
              `https://api.scryfall.com/cards/search?q=!"${name}"`
            );
            resolve(result.data.data[0]);
          } catch (err) {
            reject(err);
          }
        }, 100);
      });
      matchedCards.push({ amount, card });
      const tokenCards = card.all_parts?.filter(
        ({ component }) => component === "token"
      );
      if (tokenCards) {
        for (let { name, uri } of tokenCards) {
          const token = await new Promise(async (resolve, reject) => {
            setTimeout(async () => {
              try {
                const result = await axios.get(uri);
                resolve(result.data);
              } catch (err) {
                reject(err);
              }
            }, 100);
          });
          tokens.push({
            amount: 1,
            card: { name, image: token.image_uris.normal },
          });
        }
      }
    } catch (err) {
      console.log("Error: ", err.message);
      unmatched.push(name);
    }
  }

  return { matchedCards, unmatched, tokens };
};

const getColorIdentity = (cards) => {
  const identity = new Set();
  cards.forEach(({ card }) => {
    card.color_identity.forEach((color) => identity.add(color));
  });
  return identity;
};

const isCommander = (deckIdentity, card) => {
  if (
    !card.type_line.startsWith("Legendary Creature") &&
    !card.type_line.startsWith("Legendary Planeswalker")
  ) {
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
  const image = card.image_uris || card.card_faces[0].image_uris;
  const newCard = { name: card.name, image: image.normal };
  if (card.card_faces) {
    const imageFaces = card.card_faces.filter((face) => face.image_uris);
    if (imageFaces.length === 2) {
      newCard.faces = imageFaces.map(({ name, image_uris }) => ({
        name,
        image: image_uris.normal,
      }));
    }
  }
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
  const { cards: cardNames } = req.body;

  const { matchedCards, unmatched, tokens } = await fetchCards(cardNames);
  const filteredMatches = matchedCards.filter(Boolean);
  const filteredUnmatches = unmatched.filter(Boolean);

  const identity = getColorIdentity(filteredMatches);
  const { commanders, others } = formatCards(filteredMatches, identity);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify({ commanders, others, unmatched: filteredUnmatches, tokens })
  );
};
