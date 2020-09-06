import React from "react";
import { AppBar } from "@material-ui/core";

import NavigationItems from "../NavigationItems";

const Toolbar = (props) => (
    <AppBar position="static">
        <NavigationItems />
    </AppBar>
);

export default Toolbar;
