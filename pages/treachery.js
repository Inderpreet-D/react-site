import { Fragment } from "react";
import Head from "next/head";

import Toolbar from "../components/Navigation/Toolbar";
import Main from "../containers/Treachery/Main";
import Room from "../containers/Treachery/Room";
import Card from "../containers/Treachery/Card";

const Treachery = () => {
    return (
        <Fragment>
            <Head>
                <title>Treachery</title>
            </Head>
            <Toolbar />
            <Main />
            <Room roomCode="ASDF" numPlayers={1} roomSize={4} />
            <Card role="Assassin" imgSrc="assassin pic" />
        </Fragment>
    );
};

export default Treachery;
