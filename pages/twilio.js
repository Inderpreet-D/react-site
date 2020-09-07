import { Fragment } from "react";
import Head from "next/head";

import Toolbar from "../components/Navigation/Toolbar";
import Footer from "../components/Footer";
import TwilioChat from "../containers/Twilio/Chat";

const Twilio = (props) => {
    return (
        <Fragment>
            <Head>
                <title>Twilio Test App</title>
            </Head>
            {/* <Toolbar /> */}
            <TwilioChat />
            {/* <Footer /> */}
        </Fragment>
    );
};

export default Twilio;
