import styled, { keyframes } from "styled-components";

const BORDER_COLORS = [
  "rgb(0, 115, 62)",
  "rgb(211, 32, 42)",
  "rgb(21, 11, 0)",
  "rgb(14, 104, 171)",
].join(" ");

const CENTER_COLOR = "rgb(249, 250, 244)";

const SPIN_ANIMATION = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(0.025);
  }
  
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const StyledWrapper = styled.div`
  justify-content: center;
  align-items: center;

  display: flex;

  padding: 1.25rem;
`;

const StyledLoader = styled.div`
  justify-content: center;
  align-items: center;

  display: flex;

  animation: ${SPIN_ANIMATION} 2s linear infinite;

  border: 1rem solid;
  border-color: ${BORDER_COLORS};
  border-radius: 50%;
  box-sizing: border-box;
  width: 5rem;
  height: 5rem;

  background-color: ${CENTER_COLOR};
`;

export { StyledWrapper, StyledLoader };
