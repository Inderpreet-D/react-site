import React, { useState, useCallback, Fragment } from "react";

import styles from "./Main.module.css";

const rarityOptions = ["Uncommon", "Rare", "Mythic"];
const playerOptions = ["4", "5", "6", "7", "8"];

const Main = ({ createHandler, joinHandler }) => {
    const [isJoining, setIsJoining] = useState(true);
    const [roomCode, setRoomCode] = useState("");

    const [selectedRarity, setSelectedRarity] = useState(rarityOptions[0]);
    const [selectedPlayerNum, setSelectedPlayerNum] = useState(
        playerOptions[0]
    );

    const submitForm = (event) => {
        event.preventDefault();

        if (isJoining) {
            joinHandler();
        } else {
            createHandler();
        }
    };

    const formChangeHandler = (event) => {
        const val = event.target.value.toUpperCase();
        if (val.length <= 4) {
            setRoomCode(val);
        } else {
            setRoomCode(roomCode);
        }
    };

    let form = (
        <input
            className={styles.Input}
            value={roomCode}
            onChange={formChangeHandler}
            placeholder="Enter 4-Letter Room Code"
            pattern="[a-zA-Z]{4}"
            required
        />
    );
    if (!isJoining) {
        form = (
            <Fragment>
                <label className={styles.Label}>
                    <span>Number of Players</span>
                    <select
                        className={styles.Input}
                        value={selectedPlayerNum}
                        onChange={(event) =>
                            setSelectedPlayerNum(event.target.value)
                        }
                    >
                        {playerOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={styles.Label}>
                    <span>Rarity</span>
                    <select
                        className={styles.Input}
                        value={selectedRarity}
                        onChange={(event) =>
                            setSelectedRarity(event.target.value)
                        }
                    >
                        {rarityOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
            </Fragment>
        );
    }

    const createButtonStyles = [styles.Create, isJoining ? "" : styles.Active];
    const joinButtonStyles = [styles.Join, isJoining ? styles.Active : ""];

    return (
        <div className="BorderedBox">
            <h1>MTG Treachery</h1>
            <hr />

            <div className={styles.Buttons}>
                <button
                    className={createButtonStyles.join(" ")}
                    onClick={() => setIsJoining(false)}
                >
                    Create
                </button>
                <button
                    className={joinButtonStyles.join(" ")}
                    onClick={() => setIsJoining(true)}
                >
                    Join
                </button>
            </div>

            <form onSubmit={submitForm}>
                <div className={styles.Form}>{form}</div>
                <div className={styles.Buttons}>
                    <button className={styles.Submit}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Main;
