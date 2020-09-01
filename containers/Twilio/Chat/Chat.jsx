import { Fragment, useState, useEffect } from "react";

import styles from "./Chat.module.css";
import Message from "./Message";
import { socket } from "./socket";

const MY_NAME = "Inderpreet";
const PHONE_NUMBER = "+1 (205) 896 - 2409";

const Chat = (props) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const onMessage = (data) => {
            setMessages(data.messages);
        };
        socket.on("messages", onMessage);

        const onNewMessage = (data) => {
            setMessages((messages) => messages.concat(data));
        };
        socket.on("new-message", onNewMessage);

        return () => {
            socket.off("messages", onMessage);
            socket.off("new-message", onNewMessage);
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message.length > 0) {
            socket.emit("send-message", message);
            setMessage("");
        }
    };

    const allMessages = messages.map((message, idx) => (
        <Message
            key={idx}
            name={message.name}
            message={message.message}
            isMine={message.name === MY_NAME}
        />
    ));

    const boxClass = styles.MessageBox + " BorderedBox";

    return (
        <Fragment>
            <div className="BorderedBox">Twilio Test App</div>
            <div className={boxClass}>
                Text your name to <b>{PHONE_NUMBER}</b> to start
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
