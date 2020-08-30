import React, { useState } from "react";

import styles from "./SectionData.module.css";

const SectionData = (props) => {
    const [hovering, setHovering] = useState(false);

    const mouseEnter = () => {
        setHovering(true);
    };

    const mouseLeave = () => {
        setHovering(false);
    };

    return (
        <div
            className={styles.SectionData}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
        >
            <span className={styles.SectionDataTitle}>{props.title}</span>
            {hovering ? <span>- {props.data}</span> : null}
        </div>
    );
};

export default SectionData;
