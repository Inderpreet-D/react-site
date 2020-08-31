import React from "react";

import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem";

const NavigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/">Home</NavigationItem>
            <NavigationItem link="/projects">Projects</NavigationItem>
            <NavigationItem link="/twilio">Twilio Test</NavigationItem>
        </ul>
    );
};

export default NavigationItems;
