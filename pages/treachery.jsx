import { useState, useEffect, useRef } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import axios from "axios";

import Page from "../components/Page";
import Main from "../containers/Treachery/Main";
import Room from "../containers/Treachery/Room";
import Card from "../containers/Treachery/Card";
import LoadingIcon from "../components/LoadingIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    margin: "0 auto",
    width: "50%",
    textAlign: "center",
  },
}));

const STATES = {
  Main: 0,
  Room: 1,
  Card: 2,
  Loading: 3,
};

const api = (queryParams) => {
  const query = Object.keys(queryParams)
    .map((param) => `${param}=${queryParams[param]}`)
    .join("&");
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/treachery?${query}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const Treachery = () => {
  const classes = useStyles();
  const [state, setState] = useState(STATES.Main);
  const [roomCode, setRoomCode] = useState("");
  const [numPlayers, setNumPlayers] = useState(0);
  const [roomSize, setRoomSize] = useState(-1);
  const [role, setRole] = useState("");
  const [imgSrc, setImgSrc] = useState("/favicon.ico");
  const [winCondition, setWinCondition] = useState("");
  const [error, setError] = useState(null);

  const onJoinHandler = (roomCode) => {
    setState(STATES.Loading);
    setError(null);

    const query = { action: "join", roomCode: roomCode };
    const storage = window.sessionStorage;
    const id = storage.getItem("id");

    if (id) {
      query.id = id;
    }

    api(query).then((data) => {
      if (data.error) {
        setError(data.error);
        setState(STATES.Main);
      } else {
        setRoomCode(roomCode);
        setState(STATES.Room);
        window.sessionStorage.setItem("id", data.id);
        setNumPlayers(data.currentPlayers);
        setRoomSize(data.numPlayers);
      }
    });
  };

  const onCreateHandler = (numPlayers, rarity) => {
    setState(STATES.Loading);
    setError(null);

    api({ action: "create", numPlayers: numPlayers, rarity: rarity }).then(
      (data) => {
        if (data.error) {
          setError(data.err);
          setState(STATES.Main);
        } else {
          setRoomCode(data.roomCode);
          setState(STATES.Room);
          setNumPlayers(1);
          setRoomSize(numPlayers);
          window.sessionStorage.setItem("id", data.id);
        }
      }
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (state === STATES.Room) {
        api({ action: "room", roomCode: roomCode }).then((data) => {
          setNumPlayers(data.currentPlayers);
          setRoomSize(data.numPlayers);
          if (data.currentPlayers === data.numPlayers) {
            setState(STATES.Card);
          }
        });
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [state]);

  let page;
  if (state === STATES.Main) {
    page = (
      <Main
        onJoin={onJoinHandler}
        onCreate={onCreateHandler}
        forwardClasses={classes}
      />
    );
  } else if (state === STATES.Room) {
    page = (
      <Room roomCode={roomCode} numPlayers={numPlayers} roomSize={roomSize} />
    );
  } else if (state === STATES.Card) {
    page = <Card role={role} imgSrc={imgSrc} winCondition={winCondition} />;
  } else {
    page = <LoadingIcon />;
  }

  return (
    <Page title="Treachery">
      <div style={{ textAlign: "center" }}>
        <h1>MTG Treachery</h1>
      </div>
      <Paper variant="outlined" className={classes.root}>
        {error && (
          <div>
            <h3 style={{ color: "red" }}>Error: {error}</h3>
          </div>
        )}
        {page}
      </Paper>
    </Page>
  );
};

export default Treachery;
