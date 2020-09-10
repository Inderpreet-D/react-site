import rooms from "./state";

export default (req, res) => {
    const { roomCode } = req.query;
    console.log("Requested room", roomCode);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ name: "Treachery MTG Endpoint" }));

    // state.counter++;
    // res.statusCode = 200;
    // res.setHeader("Content-Type", "application/json");
    // res.send(
    //     JSON.stringify({ name: "Treachery MTG Endpoint", count: state.counter })
    // );
};
