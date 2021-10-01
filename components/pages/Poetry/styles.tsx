import styled, { css } from "styled-components";

const titleStyles = css`
  justify-content: center;

  display: flex;

  font-size: 2.125rem;
  line-height: 1.235;
  font-weight: bold;
  letter-spacing: 0.00735em;
  color: ${({ theme }) => theme.foreground};
`;

const StyledLink = styled.a`
  ${titleStyles}
`;

const StyledText = styled.div`
  font-size: 1.25rem;
  line-height: 1.6;
  font-weight: 500;
  letter-spacing: 0.0075em;
`;

const StyledError = styled.div`
  ${titleStyles}
`;

export { StyledError, StyledLink, StyledText };
