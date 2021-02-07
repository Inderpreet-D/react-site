import styled from "styled-components";

const StyledTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  color: ${({ theme }) => theme.foreground};
`;

export default StyledTitle;
