import styled from "styled-components";

export default styled.div`
  width: 55%;
  margin: 1rem auto;
  padding: 1.25rem;
  border: ${({ theme }) => `0.125rem solid ${theme.foregroundDark}`};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.backgroundLight};
`;
