import React from "react";
import { Button, makeStyles, Paper, TextField } from "@material-ui/core";
import Head from "next/head";

import { encode } from "../utilities/secret-helper";

const useDisplayStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    textAlign: "center",
    margin: "0.5rem auto",
    padding: "0.5rem",
    borderRadius: "2rem",
    transition: "background-color 1s",
    "&:hover": {
      backgroundColor: "#4e4e4e",
    },
  },
  textfield: {
    width: "60%",
  },
  text: {
    fontFamily: "Courier New",
    marginTop: "0.5rem",
    wordBreak: "break-word",
    fontSize: "20px",
    overflowY: "auto",
  },
}));

const Display = ({ value, onChange, secret }) => {
  const classes = useDisplayStyles();

  return (
    <div className={classes.root}>
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={classes.textfield}
        placeholder="Enter text to encrypt"
        variant="filled"
        color="secondary"
      />
      <div className={classes.text}>"{encode(secret, value)}"</div>
    </div>
  );
};

const useEncryptStyles = makeStyles((theme) => ({
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
  displays: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    overflowY: "auto",
  },
  controls: {
    width: "100%",
    textAlign: "center",
    paddingTop: "20px",
  },
  textfield: {
    width: "60%",
    marginRight: "1rem",
  },
  button: {
    height: "100%",
  },
}));

const Encrypt = () => {
  const classes = useEncryptStyles();
  const [values, setValues] = React.useState({});
  const [secret, setSecret] = React.useState("");

  const handleChange = (prop) => (value) => {
    setValues({ ...values, [prop]: value });
  };

  const handleAdd = () => {
    setValues({ ...values, [Object.keys(values).length]: "" });
  };

  return (
    <>
      <Head>
        <title>Encrypt</title>
      </Head>
      <div className={classes.root}>
        <Paper variant="outlined" className={classes.paper}>
          <div className={classes.displays}>
            {Object.entries(values).map(([k, v]) => (
              <Display
                key={k}
                value={v}
                onChange={handleChange(k)}
                secret={secret}
              />
            ))}
          </div>

          <div className={classes.controls}>
            <TextField
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className={classes.textfield}
              placeholder="Enter secret phrase"
              variant="filled"
              color="primary"
            />
            <Button onClick={handleAdd} className={classes.button}>
              Add
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Encrypt;
