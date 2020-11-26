import { useState } from "react";
import { Paper, Typography, TextField, makeStyles } from "@material-ui/core";

import Page from "../components/Page";
import { part1, part2, part3, decode } from "../utilities/secret-helper.js";

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      wordBreak: "break-word",
    },
    margin: "10px auto 0 auto",
    width: "95%",
    textAlign: "center",
    padding: "10px",
  },
  text: {
    marginTop: "10px",
    padding: "10px",
    textAlign: "left",
  },
  form: {
    width: "100%",
    textAlign: "center",
    paddingTop: "20px",
  },
  textField: {
    width: "50%",
  },
}));

const Secret = () => {
  const classes = useStyles();
  const [userInput, setUserInput] = useState("");

  return (
    <Page title="Secret">
      <Paper variant="outlined" className={classes.root}>
        <Typography variant="h1">{decode(userInput, part1)}</Typography>
        <Typography variant="h6" className={classes.text}>
          {decode(userInput, part2)}
        </Typography>
        <Typography
          variant="h7"
          className={classes.text}
          style={{ textAlign: "center" }}
        >
          {decode(userInput, part3)}
        </Typography>
        <form
          onSubmit={(event) => event.preventDefault()}
          className={classes.form}
        >
          <TextField
            variant="filled"
            color="secondary"
            placeholder="Who are you to me?"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
            className={classes.textField}
          />
        </form>
      </Paper>
    </Page>
  );
};

export default Secret;
