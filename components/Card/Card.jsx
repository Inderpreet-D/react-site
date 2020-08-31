import styles from "./Card.module.css";

const Card = (props) => {
    return (
        <div className={styles.Card}>
            <div className={styles.Title}>{props.title}</div>
            <img className={styles.Image} src={props.img} />
            <div className={styles.DescriptionBlock}>
                <div className={styles.Description}>{props.description}</div>
                <div>{props.children}</div>
            </div>
        </div>
    );
};

export default Card;
