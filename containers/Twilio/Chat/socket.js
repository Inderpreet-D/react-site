import io from "socket.io-client";
const endpoint = "http://localhost:4000";

export const socket = io(endpoint);
