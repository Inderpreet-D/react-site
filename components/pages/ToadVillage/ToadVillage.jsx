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
import mtgDownload from "../../../utilities/toad-helper";
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

  const handleDownload = () => {
    setError("");
    const errorMsg = mtgDownload(cardObjs, name);
    if (errorMsg) {
      setError(errorMsg);
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

  const nameSort = (c1, c2) => {
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

  const findCard = (name, isCommander) => {
    const check = ({ card }) => card.name === name;

    if (isCommander) {
      return cardObjs.commanders.find(check);
    } else {
      return cardObjs.others.find(check);
    }
  };

  const handleMove = (name, isCommander) => {
    const cardObj = findCard(name, isCommander);

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

  const handleCountChange = (name, isCommander, increment) => {
    const cardObj = findCard(name, isCommander);

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

  const handleAdd = (name, isCommander) => {
    handleCountChange(name, isCommander, true);
  };

  const handleRemove = (name, isCommander) => {
    handleCountChange(name, isCommander, false);
  };

  let commanderCount = 0;
  let otherCount = 0;
  let totalCount = 0;

  cardObjs.commanders?.forEach(({ amount }) => {
    commanderCount += amount;
    totalCount += amount;
  });
  cardObjs.others?.forEach(({ amount }) => {
    otherCount += amount;
    totalCount += amount;
  });

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

      {!loading && cardObjs.commanders && cardObjs.others && (
        <>
          <div className={classes.Header}>Total Cards ({totalCount})</div>
          <div className={classes.Header}>
            Commander Options / Sideboard ({commanderCount})
          </div>
          <div className={classes.CardBlock}>
            {cardObjs.commanders.map((card, i) => (
              <MTGCard
                key={i}
                onClickMove={handleMove}
                onClickAdd={handleAdd}
                onClickRemove={handleRemove}
                isCommander={true}
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
                isCommander={false}
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
