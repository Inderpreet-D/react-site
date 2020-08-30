import { Fragment } from "react";

import styles from "./ArticleSection.module.css";

const ArticleSection = (props) => (
    <Fragment>
        <div className={styles.Title}>
            <a href={props.href} target="_blank">
                {props.title}
            </a>
        </div>
        <div className={styles.Authors}>
            {props.authors.map((author, idx) => (
                <span
                    key={idx}
                    className={author === props.me ? styles.AuthorMe : ""}
                >
                    {idx === props.authors.length - 1 ? " and " : ""}
                    {author}
                    {idx !== props.authors.length - 1 ? ", " : ""}
                </span>
            ))}
        </div>
        <div className={styles.Description}>{props.description}</div>
    </Fragment>
);

export default ArticleSection;
