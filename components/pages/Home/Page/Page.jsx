import styled from "styled-components";

import meRaw from "../../../../public/me.json";
import Container, { ContainerTitle } from "../../../atoms/Container";
import { Article, Data, Date, Control } from "../Sections";

const me = [];
[
  "Publications",
  "Experience",
  "Education",
  "Technologies",
  "Languages",
].forEach((title) => {
  const section = meRaw.find((item) => item.title === title);
  me.push(section);
});

const StyledSection = styled.div`
  overflow: hidden auto;
`;

const StyledSeparator = styled.div`
  margin-bottom: 0.75rem;
  border-bottom: 0.125rem solid ${({ theme }) => theme.accent};
`;

const StyledCard = styled.div`
  flex-direction: column;
  flex-grow: 1;

  display: flex;

  box-sizing: border-box;
  padding: 0.5rem;
`;

const StyledButton = styled.div`
  align-items: center;
  justify-content: center;

  display: flex;

  transition: all 0.5s ease-in-out;

  border: 0.125rem solid
    ${({ theme, active }) => (active ? theme.foregroundDark : theme.foreground)};
  border-radius: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;

  background-color: ${({ theme, active }) =>
    active ? theme.foreground : "transparent"};
  cursor: pointer;

  color: ${({ theme, active }) => (active ? "black" : theme.text)};
`;

const StyledButtonHolder = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  display: flex;

  margin: 0.5rem 0.5rem 0.5rem 0;
  border-right: 0.125rem solid ${({ theme }) => theme.background};
  box-sizing: border-box;
  padding: 0.5rem 1rem 0.5rem 0;
`;

const StyledBox = styled.div`
  display: flex;

  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 15.5rem);
`;

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
