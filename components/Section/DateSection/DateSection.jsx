import { Fragment } from "react";

import styles from "./DateSection.module.css";

const DateSection = (props) => (
    <Fragment>
        <div className={styles.Place}>
            <span className={styles.LeftSpan}>{props.work}</span>
            <span className={styles.RightSpan}>{props.place}</span>
        </div>
        <div className={styles.Place}>
            <span className={styles.LeftSpan}>{props.position}</span>
            <span className={styles.RightSpan}>{props.date}</span>
        </div>
        <ul className={styles.Points}>
            {props.points.map((point, idx) => (
                <li key={idx}>{point}</li>
            ))}
        </ul>
    </Fragment>
);

export default DateSection;
