// To route the number to this pc use the following command
// twilio phone-numbers:update "+12058962409" --sms-url="http://localhost:4000/sms"

require("dotenv").config();

const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const { urlencoded } = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

// Twilio constants
const PHONE_NUMBER = "+12058962409";
const TWILIO_SID = process.env.SID;
const TWILIO_TOKEN = process.env.TOKEN;
const client = twilio(TWILIO_SID, TWILIO_TOKEN);

// 'Database'
const allMessages = [];
const users = {};

// Initialize express
const app = express();
app.use(urlencoded({ extended: false }));

// Block browser from restricting data
app.use(cors());

// Init socket io
const server = http.createServer(app);
const io = socketIO(server);

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the Express Server");
});

// Socket IO event handler
io.on("connect", (socket) => {
    // Retrieve all messages
    socket.emit("messages", { messages: allMessages });

    // Get message from client
    socket.on("send-message", (data) => {
        const message = { name: "Inderpreet", message: data };
        allMessages.push(message);
        socket.emit("new-message", message);

        Object.keys(users).forEach((number, idx) => {
            setTimeout(() => {
                client.messages
                    .create({
                        body: data,
                        to: number,
                        from: PHONE_NUMBER,
                    })
                    .then((msg) => {
                        console.log(`Sent ${msg.body} to ${users[number]}`);
                    });
            }, idx * 1000);
        });
    });

    socket.on("disconnect", () => {
        console.log("Disconnect");
    });
});

// Listen to SMS messages
app.post("/sms", (req, res) => {
    const sender = req.body.From;
    const message = req.body.Body;

    if (sender in users) {
        // Store message and send to client
        const msg = { name: users[sender], message: message };
        allMessages.push(msg);
        io.emit("new-message", msg);
        console.log(`${users[sender]} said: ${message}`);
    } else {
        // User registration on first message
        users[sender] = message;

        // Notify of registration
        client.messages
            .create({
                body: `Registered ${message}`,
                to: sender,
                from: PHONE_NUMBER,
            })
            .then((msg) =>
                console.log(`Added user: ${message} - ${sender}\n\t${msg.body}`)
            );
    }
});

// Start sever
server.listen(4000, () => console.log("Running on Port 4000"));
