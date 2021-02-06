import styled from "styled-components";

import Card from "../../../molecules/Card";

import projects from "../../../../public/projects.json";

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 2rem;
  padding: 2rem;
  align-content: space-between;
  height: calc(100% - 4rem);
`;

const ProjectsContainer = () => (
  <StyledGrid>
    {projects.map((data, i) => (
      <Card key={i} {...data} />
    ))}
  </StyledGrid>
);

export default ProjectsContainer;
