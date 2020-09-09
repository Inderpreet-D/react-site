import styles from "./Message.module.css";

const Message = (props) => {
    let authorClass = styles.TheirMessage;
    if (props.isMine) {
        authorClass = styles.YourMessage;
    }

    let message = (
        <div className={authorClass}>
            <div className={styles.Name}>{props.name}</div>
            <div className={styles.Message}>{props.message}</div>
        </div>
    );
    if (props.isJoin) {
        message = (
            <div className={styles.TheirMessage}>
                <div className={styles.Name}>
                    {props.name} has entered the chat.
                </div>
            </div>
        );
    }

    return message;
};
export default Message;
