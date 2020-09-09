import Page from "../components/Page";
import Main from "../containers/Treachery/Main";
import Room from "../containers/Treachery/Room";
import Card from "../containers/Treachery/Card";

const Treachery = () => {
    const onJoinHandler = (roomCode) => {
        console.log(`Trying to join ${roomCode}`);
    };

    const onCreateHandler = (numPlayers, rarity) => {
        console.log(`Building room for ${numPlayers} with rarity of ${rarity}`);
    };

    return (
        <Page title="Treachery">
            <div style={{ textAlign: "center" }}>
                <h1>MTG Treachery</h1>
            </div>
            {/* <Main onJoin={onJoinHandler} onCreate={onCreateHandler} /> */}
            <Room roomCode="ASDF" numPlayers={1} roomSize={4} />
            {/* <Card role="Assassin" imgSrc="assassin pic" /> */}
        </Page>
    );
};

export default Treachery;
