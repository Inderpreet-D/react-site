import Link from "next/link";
import { Paper } from "@material-ui/core";
import styled from "styled-components";

import Page from "../components/Page";
import styles from "../styles/Error.module.css";

const Test = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  width: 40px;
  height: 200%;
`;

const Custom404 = () => {
  return (
    <Page title="404 - Page Not Found">
      <div className={styles.Error}>
        <Test>Anything</Test>
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
