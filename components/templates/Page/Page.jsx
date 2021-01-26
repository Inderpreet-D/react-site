import { Fragment } from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import Toolbar from "../Navigation/Toolbar";
import Footer from "../Footer";
import styles from "./Page.module.css";

const Page = ({ children, title }) => (
  <Fragment>
    <Head>
      <title>{title}</title>
    </Head>
    <Toolbar />
    <div className={styles.Body}>{children}</div>
    <Footer />
  </Fragment>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Page;
