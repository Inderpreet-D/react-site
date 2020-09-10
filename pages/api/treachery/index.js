import { getRooms } from "./state";

export const send = (res, data) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
};

export default (req, res) => {
    send(res, { rooms: { ...getRooms() } });
};
