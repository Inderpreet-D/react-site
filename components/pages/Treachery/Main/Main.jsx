import { Button } from "@material-ui/core";

import JoinRoomForm from "./JoinRoomForm";
import CreateRoomForm from "./CreateRoomForm";

const rarityOptions = ["Uncommon", "Rare", "Mythic"];
const playerOptions = ["4", "5", "6", "7", "8"];

const Main = ({ onJoin, onCreate, forwardClasses, onRejoin }) => {
  const [isJoining, setIsJoining] = React.useState(true);
  const [roomCode, setRoomCode] = React.useState("");
  const [selectedRarity, setSelectedRarity] = React.useState(rarityOptions[0]);
  const [selectedPlayerNum, setSelectedPlayerNum] = React.useState(
    playerOptions[0]
  );
  const [canRejoin, setCanRejoin] = React.useState(false);

  React.useEffect(() => {
    setCanRejoin(window.sessionStorage.getItem("id") !== null);
  }, []);

  const onPlayerNumSelectedHandler = (event) => {
    setSelectedPlayerNum(event.target.value);
  };

  const onRaritySelectedHandler = (event) => {
    setSelectedRarity(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (isJoining) {
      onJoin(roomCode);
    } else {
      onCreate(selectedPlayerNum, selectedRarity);
    }
  };

  const formChangeHandler = (event) => {
    const val = event.target.value.toUpperCase();
    if (val.length <= 4) {
      setRoomCode(val);
    } else {
      setRoomCode(roomCode);
    }
  };

  let form = <JoinRoomForm value={roomCode} formChange={formChangeHandler} />;

  if (!isJoining) {
    form = (
      <CreateRoomForm
        selectedPlayerNum={selectedPlayerNum}
        onPlayerNumSelected={onPlayerNumSelectedHandler}
        selectedRarity={selectedRarity}
        onRaritySelected={onRaritySelectedHandler}
        playerOptions={playerOptions}
        rarityOptions={rarityOptions}
      />
    );
  }

  const buttonProps = {
    variant: "contained",
    color: "secondary",
  };

  return (
    <>
      <Button
        disabled={isJoining}
        {...buttonProps}
        onClick={() => setIsJoining(true)}
      >
        Join Room
      </Button>
      <Button
        disabled={!isJoining}
        {...buttonProps}
        onClick={() => setIsJoining(false)}
      >
        Create Room
      </Button>
      {canRejoin && (
        <Button {...buttonProps} onClick={onRejoin}>
          Rejoin Room
        </Button>
      )}

      <form
        onSubmit={submitForm}
        className={forwardClasses.root}
        style={{ width: "100%" }}
      >
        {form}
        <br />
        <Button {...buttonProps} type="submit">
          {isJoining ? "Join" : "Create"}
        </Button>
      </form>
    </>
  );
};

export default Main;
