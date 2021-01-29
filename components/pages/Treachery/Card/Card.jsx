import { Fragment } from "react";

import styles from "./Card.module.css";
import { Paper } from "@material-ui/core";

const Card = ({ role, imgSrc, winCondition }) => {
  return (
    <Fragment>
      <h1>Your Role is {role}</h1>
      <div className={styles.Card}>
        <img src={imgSrc} />
      </div>
      <Paper
        elevation={24}
        className={styles.DescriptionPaper}
        style={{ margin: "10px auto" }}
      >
        <h3>{winCondition}</h3>
      </Paper>
    </Fragment>
  );
};

export default Card;