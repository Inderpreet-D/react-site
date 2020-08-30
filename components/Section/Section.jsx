import React, { useState } from "react";

import styles from "./Section.module.css";

const Section = (props) => {
    const [showData, setShowData] = useState(false);

    const toggleData = () => {
        setShowData(!showData);
    };

    return (
        <div className={styles.Section}>
            <button onClick={toggleData}>&gt;</button>
            <span className={styles.SectionTitle}>{props.title}</span>
            {showData ? (
                <div className={styles.SectionData}>{props.children}</div>
            ) : null}
        </div>
    );
};

export default Section;
