import { Fragment } from "react";
import Head from "next/head";

import Toolbar from "../components/Navigation/Toolbar";
import ProjectsSection from "../containers/Projects/ProjectsContainer";

const Projects = () => {
    return (
        <Fragment>
            <Head>
                <title>Projects</title>
            </Head>
            <Toolbar />
            <div className="BorderedBox">
                <h1>My Projects</h1>
            </div>
            <ProjectsSection />
        </Fragment>
    );
};

export default Projects;
