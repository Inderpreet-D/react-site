import axios from "axios";

import Container, {
  ContainerTitle,
  ContainerError,
} from "../../../atoms/Container";
import LoadingIcon from "../../../atoms/LoadingIcon";
import Main from "../Main";
import Room from "../Room";
import Card from "../Card";

const STATE_MAIN = 0;
const STATE_ROOM = 1;
const STATE_CARD = 2;
const STATE_LOAD = 3;

const api = (queryParams) => {
  const query = Object.keys(queryParams)
    .filter((key) => queryParams[key])
    .map((param) => `${param}=${queryParams[param]}`)
    .join("&");
  return new Promise((res, rej) => {
    axios
      .get(`/api/treachery?${query}`)
      .then(({ data }) => res(data))
      .catch(rej);
  });
};

const Page = () => {
  const [state, setState] = React.useState(STATE_MAIN);
  const [roomState, setRoomState] = React.useState({
    roomCode: "",
    numPlayers: 0,
    roomSize: -1,
  });
  const [cardState, setCardState] = React.useState({});
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const roomFillInterval = setInterval(() => {
      if (state === STATE_ROOM) {
        api({ action: "room", roomCode: roomState.roomCode }).then((data) => {
          const { currentPlayers, numPlayers } = data;

          setRoomState((state) => ({
            ...state,
            numPlayers: currentPlayers,
            roomSize: numPlayers,
          }));

          if (currentPlayers === numPlayers) {
            api({
              action: "card",
              roomCode: roomState.roomCode,
              id: window.sessionStorage.getItem("id"),
            }).then((res) => {
              setCardState(res);
              setState(STATE_CARD);
            });
          }
        });
      }
    }, 1000);

    return () => {
      clearInterval(roomFillInterval);
    };
  }, [state]);

  const startLoading = () => {
    setState(STATE_LOAD);
    setError(null);
  };

  const showError = (err) => {
    setError(err);
    setState(STATE_MAIN);
  };

  const showRoom = (id, roomCode) => {
    setState(STATE_ROOM);

    window.sessionStorage.setItem("id", id);
    window.sessionStorage.setItem("roomCode", roomCode);
  };

  const handleJoin = (roomCode) => {
    startLoading();

    const id = window.sessionStorage.getItem("id");
    const query = { action: "join", roomCode, id };

    api(query).then(({ error, currentPlayers, numPlayers, id, roomCode }) => {
      if (error) {
        showError(error);
      } else {
        setRoomState({
          roomCode,
          roomSize: numPlayers,
          numPlayers: currentPlayers,
        });

        showRoom(id, roomCode);
      }
    });
  };

  const handleCreate = (numPlayers, rarity) => {
    startLoading();

    const query = { action: "create", numPlayers, rarity };

    api(query).then(({ error, roomCode, id }) => {
      if (error) {
        showError(error);
      } else {
        setRoomState({ roomCode, roomSize: numPlayers, numPlayers: 1 });
        showRoom(id, roomCode);
      }
    });
  };

  return (
    <Container>
      <ContainerTitle>MTG Treachery</ContainerTitle>

      {error && <ContainerError>Error: {error}</ContainerError>}

      {state === STATE_MAIN && (
        <Main
          onJoin={handleJoin}
          onCreate={handleCreate}
          resetError={() => setError("")}
        />
      )}
      {state === STATE_ROOM && <Room roomState={roomState} />}
      {state === STATE_CARD && <Card cardState={cardState} />}
      {state === STATE_LOAD && <LoadingIcon />}
    </Container>
  );
};

export default Page;
