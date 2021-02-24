import generate from "project-name-generator";

import { FormattedCard } from "../shared/toadvillage";

interface DownloadInput {
  commanders: FormattedCard[];
  others: FormattedCard[];
  tokens: FormattedCard[];
}

const listAsDeck = (list, idx, hasFaces = false) => {
  if (!list) {
    return null;
  }

  const contained = [];
  const ids = [];
  const deck = {};
  let deckId = 1;
  const cardTransform = {
    posX: 0,
    posY: 0,
    posZ: 0,
    rotX: 0,
    rotY: 180,
    rotZ: idx === 0 ? 180 : 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
  };

  const cardToTTS = (card, id) => {
    contained.push({
      CardID: id,
      Name: "Card",
      Nickname: card.name,
      Transform: cardTransform,
    });
    deck[deckId] = {
      FaceURL: hasFaces ? card.faces[0].image : card.image,
      BackURL: hasFaces
        ? card.faces[1].image
        : "https://i.redd.it/25zhw3vvkvn41.png",
      NumHeight: 1,
      NumWidth: 1,
      BackIsHidden: true,
    };
    deckId++;
    ids.push(id);
  };

  let currentID = 100;
  list.forEach(({ amount, card }) => {
    for (let i = 0; i < amount; i++) {
      cardToTTS(card, currentID);
      currentID += 100;
    }
  });

  const deckTransform = {
    posX: 2.2 * idx,
    posY: 1,
    posZ: 0,
    rotX: 0,
    rotY: 180,
    rotZ: idx === 0 ? 180 : 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
  };

  if (list.length > 1) {
    return {
      Name: "DeckCustom",
      ContainedObjects: contained,
      DeckIDs: ids,
      CustomDeck: deck,
      Transform: deckTransform,
    };
  } else {
    return {
      Name: "Card",
      Nickname: list[0].card?.name || list[0].name,
      CardID: 100,
      CustomDeck: deck,
      Transform: deckTransform,
    };
  }
};

const hasFace = (card: FormattedCard) => card.card.faces?.length === 2;

const convertToTTS = (cardObjs: DownloadInput) => {
  const flipCards: FormattedCard[] = [
    ...cardObjs.others.filter(hasFace),
    ...cardObjs.commanders.filter(hasFace),
  ];

  const allCards: FormattedCard[][] = [
    cardObjs.others,
    cardObjs.commanders,
    flipCards,
    cardObjs.tokens,
  ].filter((list) => Boolean(list) && list.length > 0);

  const states = [];
  let nextNum = 0;
  allCards.forEach((cardList, i) => {
    const deck = listAsDeck(cardList, nextNum, cardList === flipCards);
    if (i !== 0) {
      const newDeck = { ...deck };
      if (newDeck.DeckIDs) {
        newDeck.DeckIDs = newDeck.DeckIDs.reverse();
      }
      if (newDeck.ContainedObjects) {
        newDeck.ContainedObjects = newDeck.ContainedObjects.reverse();
      }
      states.push(newDeck);
    } else {
      states.push(deck);
    }
    nextNum++;
  });
  const obj = { ObjectStates: states.filter(Boolean) };
  return JSON.stringify(obj);
};

export const downloadBlob = (blob: Blob, name: string) => {
  const el: HTMLAnchorElement = document.createElement("a");
  el.href = URL.createObjectURL(blob);
  el.download = name;
  document.body.appendChild(el);
  el.click();
};

const download = (cardObjs: DownloadInput, name: string): string | void => {
  if (cardObjs.others) {
    if (cardObjs.others.length === 0) {
      return "You're missing a deck";
    } else {
      const blob: Blob = new Blob([convertToTTS(cardObjs)], {
        type: "application/json",
      });
      downloadBlob(blob, `${name}.json`);
    }
  } else {
    return "You must build a deck before downloading";
  }
};

export const randomName = () => {
  const random = generate({ words: 4, alliterative: false }).raw;
  const upped = random.map((val) => val.charAt(0).toUpperCase() + val.slice(1));
  return upped.join("");
};

export const nameSort = (c1, c2) => {
  const textA = c1.card.name;
  const textB = c2.card.name;
  if (textA < textB) {
    return -1;
  } else if (textA > textB) {
    return 1;
  } else {
    return c1.amount - c2.amount;
  }
};

export const downloadDecklist = (list, file) => {
  const fullName = file.name.split(".");
  fullName.splice(fullName.length - 1, 1, "LIST", "txt");
  const newName = fullName.join(".");
  const blob = new Blob([list.join("\n")], { type: "text/plain" });
  downloadBlob(blob, newName);
};

export const parseJSON = (data) => {
  const listObj = {};
  const addCard = ({ Nickname }) => {
    if (!(Nickname in listObj)) {
      listObj[Nickname] = 0;
    }
    listObj[Nickname]++;
  };

  const { ObjectStates } = data;
  addCard(ObjectStates[1]);
  ObjectStates[0].ContainedObjects.forEach(addCard);

  const kvSort = (a, b) => {
    if (a[0] < b[0]) {
      return -1;
    } else if (a[0] > b[0]) {
      return 1;
    } else {
      return 0;
    }
  };

  const deckList = Object.entries(listObj)
    .sort(kvSort)
    .map(([key, value]) => `${value} ${key}`);

  return deckList;
};

export default download;
