import { Fragment } from "react";
import Head from "next/head";

import Toolbar from "../components/Navigation/Toolbar";
import Footer from "../components/Footer";
import Main from "../containers/Treachery/Main";
import Room from "../containers/Treachery/Room";
import Card from "../containers/Treachery/Card";

const Treachery = () => {
    const onJoinHandler = (roomCode) => {
        console.log(`Trying to join ${roomCode}`);
    };

    const onCreateHandler = (numPlayers, rarity) => {
        console.log(`Building room for ${numPlayers} with rarity of ${rarity}`);
    };

    return (
        <Fragment>
            <Head>
                <title>Treachery</title>
            </Head>
            <Toolbar />
            <div style={{ textAlign: "center" }}>
                <h1>MTG Treachery</h1>
            </div>
            <Main onJoin={onJoinHandler} onCreate={onCreateHandler} />
            {/* <Room roomCode="ASDF" numPlayers={1} roomSize={4} /> */}
            {/* <Card role="Assassin" imgSrc="assassin pic" /> */}
            <Footer />
        </Fragment>
    );
};

export default Treachery;
