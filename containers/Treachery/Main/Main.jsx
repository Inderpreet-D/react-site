import React, { useState } from "react";
import { Paper, Button, makeStyles } from "@material-ui/core";

import JoinRoomForm from "./JoinRoomForm";
import CreateRoomForm from "./CreateRoomForm";

const rarityOptions = ["Uncommon", "Rare", "Mythic"];
const playerOptions = ["4", "5", "6", "7", "8"];

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

const Main = ({ onJoin, onCreate }) => {
    const classes = useStyles();

    const [isJoining, setIsJoining] = useState(true);
    const [roomCode, setRoomCode] = useState("");

    const [selectedRarity, setSelectedRarity] = useState(rarityOptions[0]);
    const [selectedPlayerNum, setSelectedPlayerNum] = useState(
        playerOptions[0]
    );

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
        <Paper variant="outlined" className={classes.root}>
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

            <form
                onSubmit={submitForm}
                className={classes.root}
                style={{ width: "100%" }}
            >
                {form}
                <br />
                <Button {...buttonProps} type="submit">
                    {isJoining ? "Join" : "Create"}
                </Button>
            </form>
        </Paper>
    );
};

export default Main;
