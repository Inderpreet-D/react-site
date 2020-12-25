import React from "react";
import Head from "next/head";
import { Paper, TextField, makeStyles } from "@material-ui/core";

import { part1, midParts, part3, decode } from "../utilities/secret-helper";

const useStyles = makeStyles(() => ({
  root: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  paper: {
    margin: "10px",
    width: "calc(100% - 20px)",
    height: "calc(100% - 20px)",
    textAlign: "center",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  },
  textBlock: {
    fontFamily: "Courier New",
    marginTop: "10px",
    padding: "10px",
    wordBreak: "break-word",
  },
  title: {
    fontSize: "75px",
  },
  text: {
    textAlign: "left",
    fontSize: "20px",
    flexShrink: "1",
    "&:hover": {
      backgroundColor: "#4e4e4e",
    },
  },
  scrollable: {
    overflowY: "auto",
  },
  subtext: {
    fontSize: "15px",
  },
  form: {
    width: "100%",
    textAlign: "center",
    paddingTop: "20px",
  },
  textField: {
    width: "60%",
  },
}));

const Secret = () => {
  const classes = useStyles();
  const [userInput, setUserInput] = React.useState("");

  const textClass = (c) => `${c} ${classes.textBlock}`;
  return (
    <>
      <Head>
        <title>Secret</title>
      </Head>
      <div className={classes.root}>
        <Paper variant="outlined" className={classes.paper}>
          <div className={textClass(classes.title)}>
            {decode(userInput, part1)}
          </div>

          <div className={classes.scrollable}>
            {midParts.map((part, i) => (
              <div key={i} className={textClass(classes.text)}>
                {decode(userInput, part)}
              </div>
            ))}
          </div>

          <div className={textClass(classes.subtext)}>
            {decode(userInput, part3)}
          </div>

          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <TextField
              variant="filled"
              color="secondary"
              placeholder="Who are you to me?"
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              className={classes.textField}
            />
          </form>
        </Paper>
      </div>
    </>
  );
};

export default Secret;
