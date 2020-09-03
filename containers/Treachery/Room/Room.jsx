import React from "react";

const Room = ({ roomCode, numPlayers, roomSize }) => {
    return (
        <div className="BorderedBox">
            <h1>Room Code: {roomCode}</h1>
            <h2>
                {numPlayers} / {roomSize} Players Joined
            </h2>
        </div>
    );
};

export default Room;
