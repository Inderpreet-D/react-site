import { Fragment } from "react";
import Head from "next/head";

import styles from "../styles/Home.module.css";
import Toolbar from "../components/Navigation/Toolbar";

const Home = () => {
    return (
        <Fragment>
            <Head>
                <title>Home</title>
            </Head>
            <Toolbar />
            <div className={styles.Home}>
                <h1>Inderpreet Dhillon</h1>
            </div>
        </Fragment>
    );
};

export default Home;
