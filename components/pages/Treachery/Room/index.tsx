import { useAppSelector } from "../../../../hooks/redux";

import LoadingIcon from "../../../atoms/LoadingIcon";

import { selectTreachery } from "../../../../slices/treachery";

const Room = () => {
  const { roomState } = useAppSelector(selectTreachery);
  const { roomCode, numPlayers, roomSize } = roomState;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 border-2 border-primary-light rounded-xl box-border w-max p-4 bg-dark-dark">
        <div className="text-center mb-2 text-4xl">Room Code: {roomCode}</div>

        <div className="text-center text-xl">
          {numPlayers} / {roomSize} Players Joined
        </div>
      </div>

      <LoadingIcon />
    </div>
  );
};

export default Room;
