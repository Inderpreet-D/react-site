import Link from "next/link";
import { Paper } from "@material-ui/core";

import Page from "../components/Page";
import styles from "../styles/Error.module.css";

const Custom404 = () => {
  return (
    <Page title="404 - Page Not Found">
      <div className={styles.Error}>
        <Paper variant="outlined">
          <h1>Page Not Found</h1>
          <Link href="/" replace>
            <a className={styles.Link}>Go back home</a>
          </Link>
        </Paper>
      </div>
    </Page>
  );
};

export default Custom404;
