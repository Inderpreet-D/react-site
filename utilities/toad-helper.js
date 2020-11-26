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

const convertToTTS = (cardObjs) => {
  const hasFace = ({ card }) => card.faces?.length == 2;
  const flipCards = [
    ...cardObjs.others.filter(hasFace),
    ...cardObjs.commanders.filter(hasFace),
  ];
  const states = [];
  let nextNum = 0;
  [cardObjs.others, cardObjs.commanders, flipCards, cardObjs.tokens].forEach(
    (l, i) => {
      if (l?.length > 0) {
        const deck = listAsDeck(l, nextNum);
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
      }
    }
  );
  const obj = { ObjectStates: states.filter(Boolean) };
  return JSON.stringify(obj);
};

const download = (cardObjs, name) => {
  if (cardObjs.others) {
    if (cardObjs.others.length === 0) {
      return "You're missing a deck";
    } else {
      const el = document.createElement("a");
      const file = new Blob([convertToTTS(cardObjs)], {
        type: "application/json",
      });
      el.href = URL.createObjectURL(file);
      el.download = `${name}.json`;
      document.body.appendChild(el);
      el.click();
    }
  } else {
    return "You must build a deck before downloading";
  }
};

export default download;
