import { Tabs } from "@material-ui/core";

import NavigationItem from "./NavigationItem";

const NavigationItems = (props) => {
    return (
        <Tabs value={false}>
            <NavigationItem link="/">Home</NavigationItem>
            <NavigationItem link="/projects">Projects</NavigationItem>
            <NavigationItem link="/twilio">Twilio Test</NavigationItem>
            <NavigationItem link="/treachery">MTG Treachery</NavigationItem>
        </Tabs>
    );
};

export default NavigationItems;
