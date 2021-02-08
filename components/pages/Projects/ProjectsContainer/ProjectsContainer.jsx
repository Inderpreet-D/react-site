import styled from "styled-components";

import Card from "../../../molecules/Card";

import projects from "../../../../public/projects.json";
import breakpoints from "../../../../breakpoints";

const StyledGrid = styled.div`
  display: grid;
  gap: 2rem;
  padding: 2rem;
  align-content: space-between;
  grid-template-columns: auto auto auto;

  @media ${breakpoints.mobile} {
    grid-template-columns: auto;
  }

  @media ${breakpoints.tablet} {
    grid-template-columns: auto auto;
  }
`;

const ProjectsContainer = () => (
  <StyledGrid>
    {projects.map((data, i) => (
      <Card key={i} {...data} />
    ))}
  </StyledGrid>
);

export default ProjectsContainer;
