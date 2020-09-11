import { useState, useEffect, useRef } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import axios from "axios";

import Page from "../components/Page";
import Main from "../containers/Treachery/Main";
import Room from "../containers/Treachery/Room";
import Card from "../containers/Treachery/Card";
import LoadingIcon from "../components/LoadingIcon";

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

const Treachery = () => {
    const classes = useStyles();
    const [state, setState] = useState(STATES.Main);
    const [roomCode, setRoomCode] = useState("");
    const [numPlayers, setNumPlayers] = useState(0);
    const [roomSize, setRoomSize] = useState(-1);
    const [role, setRole] = useState("");
    const [imgSrc, setImgSrc] = useState("/favicon.ico");
    const [winCondition, setWinCondition] = useState("");
    const [error, setError] = useState(null);

    const onJoinHandler = (roomCode) => {
        setState(STATES.Loading);
        setError(null);
        console.log(`Trying to join ${roomCode}`);

        axios.get(`/api/treachery/join?roomCode=${roomCode}`).then((res) => {
            const data = res.data;
            if (data.error) {
                setError(data.error);
                setState(STATES.Main);
            } else {
                setRoomCode(roomCode);
                setState(STATES.Room);
            }
        });
    };

    const onCreateHandler = (numPlayers, rarity) => {
        setState(STATES.Loading);
        setError(null);

        axios
            .get(
                `/api/treachery/create?numPlayers=${numPlayers}&rarity=${rarity}`
            )
            .then((res) => {
                const data = res.data;
                if (data.error) {
                    setError(data.error);
                    setState(STATES.Main);
                } else {
                    setRoomCode(data.roomCode);
                    setState(STATES.Room);
                    setNumPlayers(1);
                    setRoomSize(numPlayers);
                }
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (state === STATES.Room) {
                axios
                    .get(`/api/treachery/room?roomCode=${roomCode}`)
                    .then((res) => {
                        const data = res.data;
                        setNumPlayers(data.currentPlayers);
                        setRoomSize(data.numPlayers);
                    });
            }
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [state]);

    let page;
    if (state === STATES.Main) {
        page = (
            <Main
                onJoin={onJoinHandler}
                onCreate={onCreateHandler}
                forwardClasses={classes}
            />
        );
    } else if (state === STATES.Room) {
        page = (
            <Room
                roomCode={roomCode}
                numPlayers={numPlayers}
                roomSize={roomSize}
            />
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
