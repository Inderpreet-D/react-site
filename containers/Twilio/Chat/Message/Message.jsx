import React from "react";

import styles from "./Message.module.css";

const Message = (props) => {
    let authorClass = styles.TheirMessage;
    if (props.isMine) {
        authorClass = styles.YourMessage;
    }

    return (
        <div className={authorClass}>
            <div className={styles.Name}>{props.name}</div>
            <div className={styles.Message}>{props.message}</div>
        </div>
    );
};
export default Message;
