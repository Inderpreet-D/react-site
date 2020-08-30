import { Fragment } from "react";
import Head from "next/head";

import styles from "../styles/Home.module.css";
import Toolbar from "../components/Navigation/Toolbar";
import LanguagesSection from "../containers/Home/Languages";
import TechnologiesSection from "../containers/Home/Technologies";
import EducationSection from "../containers/Home/Education";

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
            <LanguagesSection />
            <TechnologiesSection />
            <EducationSection />
        </Fragment>
    );
};

export default Home;
