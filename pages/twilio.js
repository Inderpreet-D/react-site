import { Fragment } from "react";
import Head from "next/head";

import Toolbar from "../components/Navigation/Toolbar";
import TwilioChat from "../containers/Twilio/Chat";

const Twilio = (props) => {
    return (
        <Fragment>
            <Head>
                <title>Twilio Test App</title>
            </Head>
            <Toolbar />
            <TwilioChat />
        </Fragment>
    );
};

export default Twilio;
