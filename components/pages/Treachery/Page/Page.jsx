import { Paper, makeStyles } from "@material-ui/core";
import axios from "axios";

import LoadingIcon from "../../../atoms/LoadingIcon";
import Main from "../Main";
import Room from "../Room";
import Card from "../Card";

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

const STATE_MAIN = 0;
const STATE_ROOM = 1;
const STATE_CARD = 2;
const STATE_LOAD = 3;

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

const Page = () => {
  const classes = useStyles();
  const [state, setState] = React.useState(STATE_MAIN);
  const [roomCode, setRoomCode] = React.useState("");
  const [numPlayers, setNumPlayers] = React.useState(0);
  const [roomSize, setRoomSize] = React.useState(-1);
  const [role, setRole] = React.useState("");
  const [imgSrc, setImgSrc] = React.useState("/favicon.ico");
  const [winCondition, setWinCondition] = React.useState("");
  const [error, setError] = React.useState(null);
  const [rejoinEnabled, setRejoinEnabled] = React.useState(false);

  React.useEffect(() => {
    setRejoinEnabled(window.sessionStorage.getItem("id") !== null);
  }, []);

  React.useEffect(() => {
    const roomFillInterval = setInterval(() => {
      if (state === STATE_ROOM) {
        api({ action: "room", roomCode: roomCode }).then(
          ({ currentPlayers, numPlayers }) => {
            setRoomSize(numPlayers);
            setNumPlayers(currentPlayers);

            if (currentPlayers === numPlayers) {
              api({
                action: "card",
                roomCode: roomCode,
                id: window.sessionStorage.getItem("id"),
              }).then(({ role, imgSrc, winCondition }) => {
                setRole(role);
                setImgSrc(imgSrc);
                setWinCondition(winCondition);
              });

              setState(STATE_CARD);
            }
          }
        );
      }
    }, 1000);

    return () => {
      clearInterval(roomFillInterval);
    };
  }, [state]);

  const handleJoin = (roomCode) => {
    setState(STATE_LOAD);
    setError(null);

    const query = { action: "join", roomCode: roomCode };
    const id = window.sessionStorage.getItem("id");

    if (id) {
      query.id = id;
    }

    api(query).then(({ error, currentPlayers, numPlayers, id, roomCode }) => {
      if (error) {
        setError(error);
        setState(STATE_MAIN);
      } else {
        setRoomCode(roomCode);
        setRoomSize(numPlayers);
        setNumPlayers(currentPlayers);

        setState(STATE_ROOM);
        setRejoinEnabled(true);

        window.sessionStorage.setItem("id", id);
        window.sessionStorage.setItem("roomCode", roomCode);
      }
    });
  };

  const handleCreate = (numPlayers, rarity) => {
    setState(STATE_LOAD);
    setError(null);

    api({ action: "create", numPlayers: numPlayers, rarity: rarity }).then(
      (data) => {
        if (data.error) {
          setError(data.err);
          setState(STATE_MAIN);
        } else {
          setRoomCode(data.roomCode);
          setState(STATE_ROOM);
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

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>MTG Treachery</h1>
      </div>

      <Paper variant="outlined" className={classes.root}>
        {error && (
          <div>
            <h3 style={{ color: "red" }}>Error: {error}</h3>
          </div>
        )}

        {state === STATE_MAIN && (
          <Main
            onJoin={handleJoin}
            onCreate={handleCreate}
            forwardClasses={classes}
            showRejoin={rejoinEnabled}
            onRejoin={() =>
              handleJoin(window.sessionStorage.getItem("roomCode"))
            }
          />
        )}

        {state === STATE_ROOM && (
          <Room
            roomCode={roomCode}
            numPlayers={numPlayers}
            roomSize={roomSize}
          />
        )}

        {state === STATE_CARD && (
          <Card role={role} imgSrc={imgSrc} winCondition={winCondition} />
        )}

        {state === STATE_LOAD && <LoadingIcon />}
      </Paper>
    </>
  );
};

export default Page;
