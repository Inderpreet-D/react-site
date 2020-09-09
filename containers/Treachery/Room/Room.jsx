import { Fragment } from "react";
import LoadingIcon from "../../../components/LoadingIcon";

const Room = ({ roomCode, numPlayers, roomSize }) => {
    return (
        <Fragment>
            <h1>Room Code: {roomCode}</h1>
            <h2>
                {numPlayers} / {roomSize} Players Joined
            </h2>
            <LoadingIcon />
        </Fragment>
    );
};

export default Room;
