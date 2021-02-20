import StyledGrid from "./Page.styles";
import Card from "../../../molecules/Card";

import projects from "../../../../public/projects.json";

const Page = () => (
  <StyledGrid>
    {projects.map((data, i) => (
      <Card key={i} {...data} />
    ))}
  </StyledGrid>
);

export default Page;
