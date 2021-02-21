import styled from "styled-components";

const StyledWrapper = styled.div`
  flex-direction: column;

  display: flex;

  width: 100vw;
  height: 100vh;
`;

const StyledChildren = styled.div`
  flex-grow: 1;

  overflow: auto;
`;

export { StyledWrapper, StyledChildren };
