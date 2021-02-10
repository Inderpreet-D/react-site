import styled from "styled-components";

import Button from "../../../atoms/Button";
import { JoinRoomForm, CreateRoomForm } from "./Forms";

const StyledButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
  & > ${Button} {
    margin: 0 0.5rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  & > ${Button} {
    margin-left: 1rem;
  }
`;

const rarityOptions = ["Uncommon", "Rare", "Mythic"];
const playerOptions = ["4", "5", "6", "7", "8"];

const Main = ({ onJoin, onCreate, resetError }) => {
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

  const handleSwitch = (val) => () => {
    setIsJoining(val);
    resetError();
  };

  const handleRejoin = () => {
    onJoin(window.sessionStorage.getItem("roomCode"));
  };

  const handlePlayerNumSelected = (event) => {
    setSelectedPlayerNum(event.target.value);
  };

  const handleRaritySelected = (event) => {
    setSelectedRarity(event.target.value);
  };

  const handleCodeChange = (event) => {
    const val = event.target.value.toUpperCase();
    if (val.length <= 4) {
      setRoomCode(val);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (isJoining) {
      onJoin(roomCode);
    } else {
      onCreate(selectedPlayerNum, selectedRarity);
    }
  };

  return (
    <>
      <StyledButtonHolder>
        <Button disabled={isJoining} onClick={handleSwitch(true)}>
          Join Room
        </Button>
        <Button disabled={!isJoining} onClick={handleSwitch(false)}>
          Create Room
        </Button>
        {canRejoin && <Button onClick={handleRejoin}>Rejoin Room</Button>}
      </StyledButtonHolder>

      <StyledForm onSubmit={submitForm}>
        {isJoining ? (
          <JoinRoomForm value={roomCode} onChange={handleCodeChange} />
        ) : (
          <CreateRoomForm
            selectedPlayerNum={selectedPlayerNum}
            onPlayerNumSelected={handlePlayerNumSelected}
            selectedRarity={selectedRarity}
            onRaritySelected={handleRaritySelected}
            playerOptions={playerOptions}
            rarityOptions={rarityOptions}
          />
        )}

        <Button type="submit" disabled={isJoining && roomCode.length !== 4}>
          {isJoining ? "Join" : "Create"}
        </Button>
      </StyledForm>
    </>
  );
};

export default Main;
