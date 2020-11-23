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

import classes from "./ToadVillage.module.css";

const Card = (props) => {
  return <div>Showing card</div>;
};

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

  React.useEffect(() => {
    if (cardList.length > 0 && !showDialog) {
      console.log("New list", cardList);
      // const cardNames = cardList.map((card) => card.name);
      axios
        .get(`/api/toadvillage?cards=${JSON.stringify(cardList)}`)
        .then((res) => {
          console.log("Found", res.data);
          setCardObjs(res.data);
        });
    }
  }, [cardList, showDialog]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDownload = () => {
    console.log("Downloading");
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

  const mainboard = [];
  const sideboard = [];

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
            style={{ width: "100%" }}
            value={cardListString}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>

      <div className={classes.Header}>Commander Options</div>
      <div className={classes.CardBlock}></div>

      <div className={classes.Header}>Deck</div>
      <div className={classes.CardBlock}></div>
    </Paper>
  );
};

export default ToadVillage;
