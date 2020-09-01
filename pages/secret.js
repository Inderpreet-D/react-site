import { Fragment, useState } from "react";
import Head from "next/head";

import Toolbar from "../components/Navigation/Toolbar";
import styles from "../styles/Secret.module.css";
import { part1, part2, part3, decode } from "../secret-helper";

const Secret = () => {
    const [userInput, setUserInput] = useState("");
    const nextClasses = [styles.BorderedBox, styles.BorderedNext].join(" ");

    return (
        <Fragment>
            <Head>
                <title>Secret</title>
            </Head>
            <Toolbar />
            <div className={styles.BorderedBox}>
                <p className={styles.TopText}>{decode(userInput, part1)}</p>
            </div>
            <div className={nextClasses}>
                <p className={styles.MidText}>{decode(userInput, part2)}</p>
            </div>
            <div className={nextClasses}>
                <p className={styles.BotText}>{decode(userInput, part3)}</p>
            </div>
            <div className={nextClasses}>
                <form
                    className={styles.Input}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <input
                        className={styles.InputElement}
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        placeholder="Who are you to me?"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default Secret;
