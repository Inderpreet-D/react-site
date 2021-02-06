import { Paper, makeStyles } from "@material-ui/core";
import axios from "axios";

import Page from "../../templates/Page";
import LoadingIcon from "../../atoms/LoadingIcon";
import Main from "./Main";
import Room from "./Room";
import Card from "./Card";

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
  const [state, setState] = React.useState(STATES.Main);
  const [roomCode, setRoomCode] = React.useState("");
  const [numPlayers, setNumPlayers] = React.useState(0);
  const [roomSize, setRoomSize] = React.useState(-1);
  const [role, setRole] = React.useState("");
  const [imgSrc, setImgSrc] = React.useState("/favicon.ico");
  const [winCondition, setWinCondition] = React.useState("");
  const [error, setError] = React.useState(null);
  const [rejoinEnabled, setRejoinEnabled] = React.useState(false);

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
        setNumPlayers(data.currentPlayers);
        setRoomSize(data.numPlayers);
        storage.setItem("id", data.id);
        storage.setItem("roomCode", data.roomCode);
        setRejoinEnabled(true);
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

          const storage = window.sessionStorage;
          storage.setItem("id", data.id);
          storage.setItem("roomCode", data.roomCode);
          setRejoinEnabled(true);
        }
      }
    );
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (state === STATES.Room) {
        api({ action: "room", roomCode: roomCode }).then((data) => {
          setNumPlayers(data.currentPlayers);
          setRoomSize(data.numPlayers);
          if (data.currentPlayers === data.numPlayers) {
            api({
              action: "card",
              roomCode: roomCode,
              id: window.sessionStorage.getItem("id"),
            }).then((data) => {
              setRole(data.role);
              setImgSrc(data.imgSrc);
              setWinCondition(data.winCondition);
            });
            setState(STATES.Card);
          }
        });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [state]);

  React.useEffect(() => {
    setRejoinEnabled(window.sessionStorage.getItem("id") !== null);
  }, []);

  let page;
  if (state === STATES.Main) {
    page = (
      <Main
        onJoin={onJoinHandler}
        onCreate={onCreateHandler}
        forwardClasses={classes}
        showRejoin={rejoinEnabled}
        onRejoin={() =>
          onJoinHandler(window.sessionStorage.getItem("roomCode"))
        }
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
