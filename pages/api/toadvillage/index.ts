import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { Card, FormattedCard } from "../../../shared/toadvillage";
import { ReqCard, ScryfallPart, ScryfallCard, MatchedCard } from "./types";

const QUEUE: { [x: string]: any } = {};

const fetchCard = async (name: string): Promise<ScryfallCard> => {
  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`https://api.scryfall.com/cards/search?q=!"${name}"`)
        .then(({ data }) => resolve(data.data[0]))
        .catch(reject);
    }, 100);
  });
};

const fetchToken = async (uri: string): Promise<ScryfallCard> => {
  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      axios
        .get(uri)
        .then(({ data }) => resolve(data))
        .catch(reject);
    }, 100);
  });
};

const fetchCards = async (
  cards: ReqCard[]
): Promise<{
  matchedCards: MatchedCard[];
  unmatched: string[];
  tokens: FormattedCard[];
}> => {
  const matchedCards: MatchedCard[] = [];
  const unmatched: string[] = [];
  const tokens: FormattedCard[] = [];
  const neededTokens: ScryfallPart[] = [];

  await Promise.all(
    cards.map(async ({ amount, name }) => {
      try {
        const card: ScryfallCard = await fetchCard(name);
        matchedCards.push({ amount, card });

        card.all_parts
          ?.filter(({ component }) => component === "token")
          .forEach((token) => neededTokens.push(token));
      } catch (err) {
        console.log("Error: ", err.message);
        unmatched.push(name);
      }
    })
  );

  await Promise.all(
    [...new Set(neededTokens)].map(async ({ name, uri }) => {
      const token: ScryfallCard = await fetchToken(uri);
      tokens.push({
        amount: 1,
        card: { name, image: token.image_uris.normal },
      });
    })
  );

  return { matchedCards, unmatched, tokens };
};

const getColorIdentity = (cards: MatchedCard[]): Set<string> => {
  const identity: Set<string> = new Set();
  cards.forEach(({ card }) => {
    card.color_identity.forEach((color: string) => identity.add(color));
  });
  return identity;
};

const isCommander = (
  deckIdentity: Set<string>,
  card: ScryfallCard
): boolean => {
  const types: string[] = card.type_line.split(" ");
  if (
    !types.includes("Legendary") ||
    (!types.includes("Creature") && !types.includes("Planeswalker"))
  ) {
    return false;
  }

  const cardIdentity: Set<string> = new Set(card.color_identity);
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

const formatCard = (card: ScryfallCard): Card => {
  const image: { normal: string } =
    card.image_uris || card.card_faces[0].image_uris;
  const newCard: Card = { name: card.name, image: image.normal };

  if (card.card_faces) {
    const imageFaces: {
      image_uris: {
        normal: string;
      };
      name: string;
    }[] = card.card_faces.filter((face) => face.image_uris);

    if (imageFaces.length === 2) {
      newCard.faces = imageFaces.map(({ name, image_uris }) => ({
        name,
        image: image_uris.normal,
      }));
    }
  }

  return newCard;
};

const formatCards = (
  cards: MatchedCard[],
  identity: Set<string>
): { commanders: FormattedCard[]; others: FormattedCard[] } => {
  const commanders: FormattedCard[] = [];
  const others: FormattedCard[] = [];

  cards.forEach(({ amount, card }) => {
    const formatted: Card = formatCard(card);
    const val: FormattedCard = { amount, card: formatted };

    if (isCommander(identity, card)) {
      commanders.push(val);
    } else {
      others.push(val);
    }
  });

  return { commanders, others };
};

const coalesce = (cards: FormattedCard[]): FormattedCard[] => {
  const coalesced: { [x: string]: FormattedCard } = {};

  cards.forEach(({ amount, card }) => {
    if (!(card.name in coalesced)) {
      coalesced[card.name] = { amount: 0, card };
    }
    coalesced[card.name].amount += amount;
  });

  return Object.values(coalesced);
};

const handleRequest = async (
  id: string,
  cardNames: ReqCard[]
): Promise<void> => {
  const { matchedCards, unmatched, tokens } = await fetchCards(cardNames);
  const filteredMatches: MatchedCard[] = matchedCards.filter(Boolean);
  const filteredUnmatches: string[] = unmatched.filter(Boolean);

  const identity: Set<string> = getColorIdentity(filteredMatches);
  const { commanders, others } = formatCards(filteredMatches, identity);

  QUEUE[id] = {
    status: "DONE",
    commanders: coalesce(commanders),
    others: coalesce(others),
    tokens: coalesce(tokens),
    unmatched: [...new Set(filteredUnmatches)],
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cardNames: ReqCard[] = req.body.cards;
  const id: string = req.body.id;

  res.setHeader("Content-Type", "application/json");

  if (cardNames) {
    res.status(200).send({ status: "POLL" });
    handleRequest(id, cardNames);
  } else {
    if (id in QUEUE) {
      res.status(200).send(QUEUE[id]);
      delete QUEUE[id];
    } else {
      res.status(200).send({ status: "WAIT" });
    }
  }
};
