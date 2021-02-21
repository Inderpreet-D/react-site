import styled, { css } from "styled-components";

const defaultStyles = css`
  line-height: 1.235;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.00735em;
`;

const StyledSubHeader = styled.div`
  ${defaultStyles};

  font-size: 1.25rem;
`;

const StyledHeader = styled.div`
  ${defaultStyles};

  margin-bottom: 0.5rem;

  font-size: 2rem;
`;

const StyledInfoHolder = styled.div`
  margin-bottom: 1rem;
  border: 0.125rem solid ${({ theme }) => theme.foreground};
  border-radius: 0.25rem;
  box-sizing: border-box;
  width: max-content;
  padding: 1rem;

  background-color: ${({ theme }) => theme.background};
`;

const StyledContainer = styled.div`
  align-items: center;
  flex-direction: column;

  display: flex;
`;

export { StyledContainer, StyledInfoHolder, StyledHeader, StyledSubHeader };
