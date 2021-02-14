import styled, { css } from "styled-components";

const defaultStyles = css`
  line-height: 1.235;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.00735em;
`;

const StyledContainer = styled.div`
  align-items: center;
  flex-direction: column;

  display: flex;
`;

const StyledHeader = styled.div`
  ${defaultStyles};

  font-size: 2rem;
`;

const StyledCard = styled.img`
  margin: 1.5rem 0;
  border: 0.1875rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 5%;
  box-sizing: border-box;
`;

const StyledDescription = styled.div`
  ${defaultStyles};

  border: 0.125rem solid ${({ theme }) => theme.foreground};
  border-radius: 0.25rem;
  max-width: 80%;
  padding: 0.5rem 0.7rem;

  background-color: ${({ theme }) => theme.background};

  font-size: 1.5rem;
  text-align: left;
`;

const Card = ({ cardState: { role, imgSrc, winCondition } }) => (
  <StyledContainer>
    <StyledHeader>Your Role is {role}</StyledHeader>

    <StyledCard src={imgSrc} />

    <StyledDescription>{winCondition}</StyledDescription>
  </StyledContainer>
);

export default Card;
