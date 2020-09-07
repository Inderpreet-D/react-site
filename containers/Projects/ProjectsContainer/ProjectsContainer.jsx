import React from "react";

import styles from "./ProjectsContainer.module.css";
import Card from "../../../components/Card";
import { Grid } from "@material-ui/core";

const ProjectsContainer = (props) => {
    let key = 0;
    const cards = [
        <Card
            key={key++}
            title="This Site"
            description="This site is built using React along with NextJS for server-side rendering."
            href="https://github.com/Inderpreet-D/react-site"
            hrefTitle="Source Code on Github"
        />,
        <Card
            key={key++}
            title="P2P Distributed File Sharing System"
            description="A Bittorrent clone written in Java, able to anonymously transfer files between users in the system. Supports
multi-threaded downloading and uploading, allowing for fast file transfer."
            href="https://github.com/Inderpreet-D/CPSC559_Bittorrent"
            hrefTitle="Source Code on Github"
        />,
        <Card
            key={key++}
            title="Telestrations"
            description="A web-based implementation of the Telestrations board game. Allows up to 8 players to play simultaneously.
Makes use of NodeJS as a backend and uses Google’s Firebase realtime database; game logic written in JavaScript."
            href="https://github.com/Inderpreet-D/Telestrations"
            hrefTitle="Source Code on Github"
        />,
        <Card
            key={key++}
            title="MagicDB"
            description="An inventory system built in React to keep track of your Magic the Gathering card collection."
            href="/mtgdb"
            hrefTitle="Go to MagicDB"
        />,
        <Card
            key={key++}
            title="ART 321 Site"
            description="My website for a Net Art course I took in University."
            href="http://pages.cpsc.ucalgary.ca/~inderpreet.dhillon/ART321/index.html"
            hrefTitle="View ART 321"
        />,
        <Card
            key={key++}
            title="SENG 513 Site"
            description="Projects for a course in web applications."
            href="http://pages.cpsc.ucalgary.ca/~inderpreet.dhillon/SENG513/index.html"
            hrefTitle="View SENG 513"
        />,
        <Card
            key={key++}
            title="Treacher App"
            description="A web app, built in React, for randomly assigning and viewing roles in the Treachery variant of EDH."
            href="/treachery"
            hrefTitle="Go to Treachery"
        />,
        <Card
            key={key++}
            title="NodeJS Chat"
            description="A multi-user chat app built using NodeJS as a backend."
            href="https://github.com/Inderpreet-D/NodeJS-Chat"
            hrefTitle="Source Code on Github"
        />,
        <Card
            key={key++}
            title="Other Projects"
            description="All of my other project on Github."
            href="https://github.com/Inderpreet-D?tab=repositories"
            hrefTitle="View My Repositories"
        />,
    ];

    return (
        <Grid container spacing={2} className={styles.Grid}>
            {cards}
        </Grid>
    );
};

export default ProjectsContainer;
