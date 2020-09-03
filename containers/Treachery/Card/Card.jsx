import { Fragment } from "react";

import styles from "./Card.module.css";

const Card = ({ role, imgSrc }) => {
    return (
        <Fragment>
            <div className="BorderedBox">
                <h1>Your Role is {role}</h1>
            </div>
            <div className="BorderedBox">
                <img className={styles.Card} src="/favicon.ico" />
                {imgSrc}
            </div>
        </Fragment>
    );
};

export default Card;
