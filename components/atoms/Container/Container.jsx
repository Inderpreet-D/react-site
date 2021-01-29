import styled from "styled-components";

export default styled.div`
  width: 55%;
  padding: 1.25rem;
  margin: 1rem auto;
  border: ${({ theme }) => `0.125rem solid ${theme.foregroundDark}`};
  border-radius: 1rem;
`;
