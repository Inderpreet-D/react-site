import styled from "styled-components";

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  text-decoration: underline;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.235;
  letter-spacing: 0.00735em;
  color: ${({ theme }) => theme.foreground};
`;

export default StyledTitle;
