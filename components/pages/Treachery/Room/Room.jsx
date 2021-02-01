import LoadingIcon from "../../../atoms/LoadingIcon";

const Room = ({ roomCode, numPlayers, roomSize }) => {
  return (
    <>
      <h1>Room Code: {roomCode}</h1>
      <h2>
        {numPlayers} / {roomSize} Players Joined
      </h2>
      <LoadingIcon />
    </>
  );
};

export default Room;
