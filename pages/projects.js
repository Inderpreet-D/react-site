import { Fragment } from "react";
import Head from "next/head";

import Toolbar from "../components/Navigation/Toolbar";
import Footer from "../components/Footer";
import ProjectsSection from "../containers/Projects/ProjectsContainer";

const Projects = () => {
    return (
        <Fragment>
            <Head>
                <title>Projects</title>
            </Head>
            <Toolbar />
            <div style={{ textAlign: "center" }}>
                <h1>My Projects</h1>
            </div>
            <ProjectsSection />
            <Footer />
        </Fragment>
    );
};

export default Projects;
