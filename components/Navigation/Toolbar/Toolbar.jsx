import React from "react";

import styles from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems";

const Toolbar = (props) => (
    <header className={styles.Toolbar}>
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;
