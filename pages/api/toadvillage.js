import axios from "axios";

const matchCards = (names, cards) => {
  const unmatched = [];
  const matchedCards = names.map(({ amount, name }) => {
    const card = cards.find((card) => card.name === name);
    if (card) {
      return { amount, card };
    } else {
      unmatched.push(name);
    }
  });
  return { matchedCards, unmatched };
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
  const image = card.image_uris || card.card_faces[0].image_uris;
  const newCard = { name: card.name, image: image.normal };
  if (card.card_faces) {
    newCard.faces = card.card_faces.map(({ name, image_uris }) => ({
      name,
      image: image_uris.normal,
    }));
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

const fetchCards = async (names) => {
  return [];
};

export default async (req, res) => {
  const { cards: cardNames } = req.body;

  console.log("In cards", cardNames);
  const commanders = [];
  const others = [];
  const unmatched = [];

  // const cards = await fetchCards(cardNames);
  // const { matchedCards, unmatched } = matchCards(cardNames, cards);
  // const filteredMatches = matchedCards.filter(Boolean);

  // const identity = getColorIdentity(filteredMatches);
  // const { commanders, others } = formatCards(filteredMatches, identity);

  // TODO: Add token support

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ commanders, others, unmatched }));
};
