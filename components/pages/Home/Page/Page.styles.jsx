import styled from "styled-components";

import breakpoints from "../../../../utilities/breakpoints";

const StyledSeparator = styled.div`
  margin-bottom: 0.75rem;
  border-bottom: 0.125rem solid ${({ theme }) => theme.accent};
`;

const StyledSection = styled.div`
  overflow: hidden auto;
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

  margin-bottom: 0.5rem;
  border-right: none;
  border-bottom: 0.125rem solid ${({ theme }) => theme.background};
  box-sizing: border-box;
  padding: 0.5rem 0.5rem 1rem 0.5rem;

  ${StyledButton}:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  @media ${breakpoints.desktop} {
    margin: 0.5rem 0.5rem 0.5rem 0;
    border-right: 0.125rem solid ${({ theme }) => theme.background};
    border-bottom: none;
    padding: 0.5rem 1rem 0.5rem 0;

    ${StyledButton} {
      margin: 0;
    }
  }
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  width: 100%;

  @media ${breakpoints.desktop} {
    flex-direction: row;

    height: 50vh;
  }
`;

export {
  StyledSeparator,
  StyledBox,
  StyledButtonHolder,
  StyledButton,
  StyledCard,
  StyledSection,
};
