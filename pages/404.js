import { Fragment } from "react";
import Link from "next/link";
import Head from "next/head";

import styles from "../styles/Error.module.css";

const Custom404 = () => {
    return (
        <Fragment>
            <Head>
                <title>404 - Page Not Found</title>
            </Head>
            <div className={styles.Error}>
                <h1>Page Not Found</h1>
                <Link href="/" replace>
                    <a>Go back home</a>
                </Link>
            </div>
        </Fragment>
    );
};

export default Custom404;
