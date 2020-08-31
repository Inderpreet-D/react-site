import styles from "./Card.module.css";
import Link from "next/link";

const Card = (props) => {
    let target = "_blank";
    if (props.href.startsWith("/")) {
        target = "";
    }

    return (
        <div className={styles.Card}>
            <div className={styles.Title}>{props.title}</div>
            <div className={styles.Description}>{props.description}</div>
            <div className={styles.LinkBlock}>
                <div className={styles.Link}>
                    <Link href={props.href}>
                        <a target={target}>{props.hrefTitle}</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
