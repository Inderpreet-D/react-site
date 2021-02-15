import styled from "styled-components";

import me from "../../../../public/me.json";
import Container, { ContainerTitle } from "../../../atoms/Container";
import { Article, Data, Date } from "../Sections";

const StyledCard = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  flex-grow: 1;
  overflow: hidden auto;
`;

const StyledButton = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  color: ${({ theme, active }) => (active ? "black" : theme.text)};
  border: 0.125rem solid
    ${({ theme, active }) => (active ? theme.foregroundDark : theme.foreground)};
  background-color: ${({ theme, active }) =>
    active ? theme.foreground : "transparent"};
  border-radius: 0.5rem;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
`;

const StyledButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  border-right: 0.125rem solid ${({ theme }) => theme.background};
  padding: 0.5rem 1rem 0.5rem 0;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

const StyledBox = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 14.5rem);
`;

const Page = () => {
  const [idx, setIdx] = React.useState(0);
  const [panelIdx, setPanelIdx] = React.useState(0);

  const components = { Article, Data, Date };

  const update = (i) => () => {
    setIdx(i);
    setPanelIdx(0);
  };

  const { type, data } = me[idx];
  const Section = components[type];

  return (
    <Container>
      <ContainerTitle>Inderpreet Dhillon</ContainerTitle>

      <StyledBox>
        <StyledButtonHolder>
          {me.map(({ title }, i) => (
            <StyledButton key={i} active={idx === i} onMouseEnter={update(i)}>
              {title}
            </StyledButton>
          ))}
        </StyledButtonHolder>

        <StyledCard>
          <Section data={data} idx={panelIdx} />
        </StyledCard>
      </StyledBox>
    </Container>
  );
};

export default Page;
