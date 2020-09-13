import { Paper, TextField, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";

import styles from "./Chat.module.css";
import Message from "./Message";
import { socket } from "./socket";

const MY_NAME = "Inderpreet";
const PHONE_NUMBER = "+1 (205) 896 - 2409";

const Chat = () => {
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

    const onJoin = (data) => {
      setMessages((messages) => messages.concat(data));
    };
    socket.on("join", onJoin);

    return () => {
      socket.off("messages", onMessage);
      socket.off("new-message", onNewMessage);
      socket.off("join", onJoin);
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
      isJoin={message.isJoin}
    />
  ));

  return (
    <Paper variant="outlined" className={styles.TextArea}>
      <Typography variant="h3">Twilio Test App</Typography>
      <Typography variant="h6">
        Text your name to <b>{PHONE_NUMBER}</b> to start
      </Typography>
      <div className={styles.TextArea}>
        <div className={styles.MessageArea}>{allMessages}</div>
        <form onSubmit={sendMessage} className={styles.FormArea}>
          <TextField
            className={styles.InputField}
            type="text"
            placeholder="Message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            variant="filled"
          />
        </form>
      </div>
    </Paper>
  );
};

export default Chat;
