import {
  StyledSeparator,
  StyledBox,
  StyledButtonHolder,
  StyledButton,
  StyledCard,
  StyledSection,
} from "./Page.styles";
import Container, { ContainerTitle } from "../../../atoms/Container";
import { Article, Data, Date } from "./Sections";
import Control from "./Control";

import meRaw from "../../../../public/me.json";

const me = [
  "Publications",
  "Experience",
  "Education",
  "Technologies",
  "Languages",
].map((title) => meRaw.find((item) => item.title === title));

const Page = () => {
  const [idx, setIdx] = React.useState(0);
  const [panelIdx, setPanelIdx] = React.useState(0);

  const components = { Article, Data, Date };

  const update = (i) => () => {
    setIdx(i);
    setPanelIdx(0);
  };

  const updatePanel = (i) => () => setPanelIdx((old) => old + i);

  const { type, data } = me[idx];
  const Section = components[type];

  const showControls = type !== "Data" && data.length > 1;

  return (
    <Container>
      <ContainerTitle>Inderpreet Dhillon</ContainerTitle>

      <StyledSeparator />

      <StyledBox>
        <StyledButtonHolder>
          {me.map(({ title }, i) => (
            <StyledButton key={i} active={idx === i} onMouseEnter={update(i)}>
              {title}
            </StyledButton>
          ))}
        </StyledButtonHolder>

        <StyledCard>
          {showControls && (
            <Control
              current={panelIdx}
              last={data.length}
              onForward={updatePanel(1)}
              onBack={updatePanel(-1)}
            />
          )}

          <StyledSection>
            <Section data={data} idx={panelIdx} />
          </StyledSection>
        </StyledCard>
      </StyledBox>
    </Container>
  );
};

export default Page;
