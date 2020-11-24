import React from "react";
import {
  Button,
  ButtonGroup,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
} from "@material-ui/core";
import axios from "axios";
import generate from "project-name-generator";

import MTGCard from "../../components/MTGCard";
import LoadingIcon from "../../components/LoadingIcon";
import classes from "./ToadVillage.module.css";

const randomName = () => {
  const random = generate({ words: 4, alliterative: false }).raw;
  const upped = random.map((val) => val.charAt(0).toUpperCase() + val.slice(1));
  return upped.join("");
};

const ToadVillage = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [cardList, setCardList] = React.useState([]);
  const [cardListString, setCardListString] = React.useState([]);
  const [cardObjs, setCardObjs] = React.useState({});
  const [name, setName] = React.useState(randomName());
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (cardList.length > 0 && !showDialog) {
      setLoading(true);
      setError("");
      axios.post("/api/toadvillage", { cards: cardList }).then((res) => {
        const data = {
          commanders: res.data.commanders,
          others: res.data.others,
          tokens: res.data.tokens,
        };
        const unmatched = res.data.unmatched;
        if (unmatched.length > 0) {
          const msg = `Could not find the following card${
            unmatched.length === 1 ? "" : "s"
          }: ${unmatched.join(", ")}`;
          setError(msg);
        }
        setCardObjs(data);
        setLoading(false);
      });
    } else if (cardList.length === 0) {
      setCardObjs({});
    }
  }, [cardList, showDialog]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

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

    list.forEach(({ amount, card }, idx) => {
      for (let i = 0; i < amount; i++) {
        cardToTTS(card, (idx + i + 1) * 100);
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

  const convertToTTS = () => {
    const hasFace = ({ card }) => card.faces?.length == 2;
    const flipCards = [
      ...cardObjs.others.filter(hasFace),
      ...cardObjs.commanders.filter(hasFace),
    ];
    const states = [
      listAsDeck(cardObjs.others, 0),
      listAsDeck(cardObjs.commanders, 1),
    ];
    let nextNum = 2;
    if (flipCards.length > 0) {
      states.push(listAsDeck(flipCards, nextNum, true));
      nextNum++;
    }
    states.push(listAsDeck(cardObjs.tokens, nextNum));
    const obj = { ObjectStates: states.filter(Boolean) };
    return JSON.stringify(obj);
  };

  const handleDownload = () => {
    setError("");
    if (cardObjs.commanders && cardObjs.others) {
      if (cardObjs.commanders.length === 0) {
        setError("You're missing a commander");
      } else if (cardObjs.others.length === 0) {
        setError("You're missing a deck");
      } else {
        const el = document.createElement("a");
        const file = new Blob([convertToTTS()], {
          type: "application/json",
        });
        el.href = URL.createObjectURL(file);
        el.download = `${name}.json`;
        document.body.appendChild(el);
        el.click();
      }
    } else {
      setError("You must build a deck before downloading");
    }
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleSetCards = (e) => {
    setError("");
    const cards = e.target.value.trim().split("\n");
    let error = "";
    const newCardList = cards.map((card, i) => {
      const split = card.split(" ");
      const amount = +split[0];
      if (isNaN(amount)) {
        error = `Invalid Entry ${card} on line ${i + 1}`;
      }
      const name = split.slice(1).join(" ");
      return { amount, name };
    });
    if (error) {
      setError(error);
    } else {
      setCardList(newCardList);
    }
    setCardListString(e.target.value);
  };

  const findCard = (name) => {
    const check = ({ card }) => card.name === name;
    const cmd = cardObjs.commanders.find(check);

    if (cmd) {
      return { isCommander: true, cardObj: cmd };
    } else {
      return { isCommander: false, cardObj: cardObjs.others.find(check) };
    }
  };

  const nameSort = (c1, c2) => {
    const textA = c1.card.name;
    const textB = c2.card.name;
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };

  const handleMove = (name) => {
    const { isCommander, cardObj } = findCard(name);

    if (isCommander) {
      const commanders = cardObjs.commanders.filter((card) => card !== cardObj);
      const others = [...cardObjs.others, cardObj].sort(nameSort);
      setCardObjs({ commanders, others });
    } else {
      const others = cardObjs.others.filter((card) => card !== cardObj);
      const commanders = [...cardObjs.commanders, cardObj].sort(nameSort);
      setCardObjs({ commanders, others });
    }
  };

  const handleCountChange = (name, increment) => {
    const { isCommander, cardObj } = findCard(name);

    let list = cardObjs.others;
    if (isCommander) {
      list = cardObjs.commanders;
    }

    const filtered = list.filter((card) => card !== cardObj);
    const newList = [
      ...filtered,
      { ...cardObj, amount: cardObj.amount + (increment ? 1 : -1) },
    ].sort(nameSort);

    if (isCommander) {
      setCardObjs({ ...cardObjs, commanders: newList });
    } else {
      setCardObjs({ ...cardObjs, others: newList });
    }
  };

  const handleAdd = (name) => {
    handleCountChange(name, true);
  };

  const handleRemove = (name) => {
    handleCountChange(name, false);
  };

  let commanderCount = 0;
  let otherCount = 0;

  cardObjs.commanders?.forEach(({ amount }) => (commanderCount += amount));
  cardObjs.others?.forEach(({ amount }) => (otherCount += amount));

  return (
    <Paper variant="outlined" className={classes.Paper}>
      <Typography variant="h4" className={classes.Title}>
        Toad Village
      </Typography>

      <div className={classes.Buttons}>
        <ButtonGroup>
          <Button variant="outlined" onClick={() => setShowDialog(true)}>
            Import Deck List
          </Button>
          <Button variant="outlined" onClick={handleDownload}>
            Download
          </Button>
        </ButtonGroup>
      </div>

      {error && <div className={classes.Error}>{error}</div>}

      <div className={classes.TextField}>
        <TextField
          value={name}
          onChange={handleNameChange}
          variant="outlined"
          fullWidth
        />
      </div>

      <Dialog
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="title">Enter Decklist</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            autoFocus
            margin="dense"
            onChange={handleSetCards}
            rowsMin={20}
            rowsMax={50}
            style={{ width: "100%", maxHeight: "70vh" }}
            value={cardListString}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCardList({});
              setCardListString("");
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>

      {loading && <LoadingIcon />}

      {cardObjs.commanders && cardObjs.others && (
        <>
          <div className={classes.Header}>
            Commander Options ({commanderCount})
          </div>
          <div className={classes.CardBlock}>
            {cardObjs.commanders.map((card, i) => (
              <MTGCard
                key={i}
                onClickMove={handleMove}
                onClickAdd={handleAdd}
                onClickRemove={handleRemove}
                {...card}
              />
            ))}
          </div>
          <div className={classes.Header}>Deck ({otherCount})</div>
          <div className={classes.CardBlock}>
            {cardObjs.others.map((card, i) => (
              <MTGCard
                key={i}
                onClickMove={handleMove}
                onClickAdd={handleAdd}
                onClickRemove={handleRemove}
                {...card}
              />
            ))}
          </div>
        </>
      )}
    </Paper>
  );
};

export default ToadVillage;
