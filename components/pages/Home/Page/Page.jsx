import styled from "styled-components";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import me from "../../../../public/me.json";
import Container, { ContainerTitle } from "../../../atoms/Container";
import Button from "../../../atoms/Button";
import { Article, Data, Date } from "../Sections";

const StyledControlButton = styled(Button)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;

  & > ${StyledControlButton}:first-child {
    margin-right: 1rem;
  }

  & > ${StyledControlButton}:last-child {
    margin-left: 1rem;
  }
`;

const StyledCard = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  flex-grow: 1;
  overflow: hidden auto;
  display: flex;
  flex-direction: column;
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

const StyledSeparator = styled.div`
  border-bottom: 0.125rem solid ${({ theme }) => theme.accent};
  margin-bottom: 0.75rem;
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
            <StyledControls>
              <StyledControlButton
                disabled={panelIdx === 0}
                onClick={updatePanel(-1)}
              >
                <FaAngleLeft />
              </StyledControlButton>
              {panelIdx + 1} / {data.length}
              <StyledControlButton
                disabled={panelIdx === data.length - 1}
                onClick={updatePanel(1)}
              >
                <FaAngleRight />
              </StyledControlButton>
            </StyledControls>
          )}
          <Section data={data} idx={panelIdx} />
        </StyledCard>
      </StyledBox>
    </Container>
  );
};

export default Page;
