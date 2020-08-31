import { Fragment, useState, useEffect } from "react";

import styles from "./Chat.module.css";
import Message from "./Message";

const Chat = (props) => {
    const myName = "Inderpreet";
    const number = "+1 (205) 896 - 2409";

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const messageFetcher = setInterval(() => {
            fetch("http://localhost:4000/messages")
                .then((res) => res.json())
                .then((json) => {
                    setMessages(json);
                })
                .catch((err) => console.log(err));
        }, 1000);

        return () => {
            clearInterval(messageFetcher);
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message.length > 0) {
            fetch(
                `http://localhost:4000/send-text?message=${message}`
            ).catch((err) => console.log(err));
            setMessage("");
        }
    };

    const allMessages = messages.map((message, idx) => (
        <Message
            key={idx}
            name={message.name}
            message={message.message}
            isMine={message.name === myName}
        />
    ));

    const boxClass = styles.MessageBox + " BorderedBox";

    return (
        <Fragment>
            <div className="BorderedBox">Twilio Test App</div>
            <div className={boxClass}>
                Text your name to <b>{number}</b> to start
            </div>
            <div className={boxClass}>
                <div className={styles.MessageArea}>{allMessages}</div>
                <form onSubmit={sendMessage} className={styles.Input}>
                    <input
                        className={styles.InputElement}
                        type="text"
                        placeholder="Message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default Chat;
