import styled from "styled-components";

import me from "../../../../public/me.json";
import Container, { ContainerTitle } from "../../../atoms/Container";

const StyledCard = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid blue;
  flex-grow: 1;
`;

const StyledButton = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 0.0625rem solid ${({ theme }) => theme.foregroundDark};
  background-color: ${({ theme, active }) =>
    active ? theme.foreground : "transparent"};
  border-radius: 0.5rem;
`;

const StyledButtonHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  border: 1px solid yellow;
  min-height: 20rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

const StyledBox = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 1px solid red;
  width: 100%;
`;

const Page = () => {
  const [idx, setIdx] = React.useState(-1);

  const handleClick = (num) => () => {
    setIdx(num !== idx ? num : -1);
  };

  const sections = [];

  return (
    <Container>
      <ContainerTitle>Inderpreet Dhillon</ContainerTitle>

      {/* {sections.map((Component, i) => (
        <Component key={i} expanded={idx === i} clickHandler={handleClick(i)} />
      ))} */}

      <StyledBox>
        <StyledButtonHolder>
          {me.map(({ title }, i) => (
            <StyledButton key={i} active={i === 0}>
              {title}
            </StyledButton>
          ))}
        </StyledButtonHolder>

        <StyledCard>TEST DATA</StyledCard>
      </StyledBox>
    </Container>
  );
};

export default Page;
