import { Paper, makeStyles } from "@material-ui/core";

import Page from "../components/Page";
import Main from "../containers/Treachery/Main";
import Room from "../containers/Treachery/Room";
import Card from "../containers/Treachery/Card";

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

const Treachery = () => {
    const classes = useStyles();

    const onJoinHandler = (roomCode) => {
        console.log(`Trying to join ${roomCode}`);
    };

    const onCreateHandler = (numPlayers, rarity) => {
        console.log(`Building room for ${numPlayers} with rarity of ${rarity}`);
    };

    return (
        <Page title="Treachery">
            <div style={{ textAlign: "center" }}>
                <h1>MTG Treachery</h1>
            </div>
            <Paper variant="outlined" className={classes.root}>
                {/* <Main
                    onJoin={onJoinHandler}
                    onCreate={onCreateHandler}
                    forwardClasses={classes}
                /> */}
                <Room roomCode="ASDF" numPlayers={1} roomSize={4} />
                {/* <Card role="Assassin" imgSrc="assassin pic" /> */}
            </Paper>
        </Page>
    );
};

export default Treachery;
