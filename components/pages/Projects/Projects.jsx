import Page from "../../templates/Page";
import ProjectsSection from "./ProjectsContainer";

const Projects = () => {
  return (
    <Page title="Projects">
      <div style={{ textAlign: "center" }}>
        <h1>My Projects</h1>
      </div>
      <ProjectsSection />
    </Page>
  );
};

export default Projects;
