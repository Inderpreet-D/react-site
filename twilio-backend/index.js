// To route the number to this pc use the following command
// twilio phone-numbers:update "+12058962409" --sms-url="http://localhost:4000/sms"58962409" --sms-url="http://localhost:4000/sms"

require("dotenv").config();

const http = require("http");
const express = require("express");
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

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the Express Server");
});

// Web client sends messages to this endpoint
app.get("/send-text", (req, res) => {
    const { message } = req.query;
    allMessages.push({ name: "Inderpreet", message: message });

    // Send text to all registered users with one second delay
    Object.keys(users).forEach((number, idx) => {
        setTimeout(() => {
            client.messages
                .create({
                    body: message,
                    to: number,
                    from: PHONE_NUMBER,
                })
                .then((msg) => {
                    console.log(`Sent ${msg.body} to ${users[number]}`);
                });
        }, idx * 1000);
    });
});

// Listen to SMS messages
app.post("/sms", (req, res) => {
    const sender = req.body.From;
    const message = req.body.Body;

    if (sender in users) {
        allMessages.push({ name: users[sender], message: message });
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

// Retrieve all messages
app.get("/messages", (req, res) => {
    res.send(allMessages);
});

// Start sever
http.createServer(app).listen(4000, () => console.log("Running on Port 4000"));
