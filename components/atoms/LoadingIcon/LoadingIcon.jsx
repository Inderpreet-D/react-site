import styled, { keyframes } from "styled-components";

const colors = [
  "rgb(0, 115, 62)", // Green
  "rgb(211, 32, 42)", // Red
  "rgb(21, 11, 0)", // Black
  "rgb(14, 104, 171)", // Blue
  "rgb(249, 250, 244)", // White
];

const spin = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const StyledWrapper = styled.div`
  padding: 1.25rem;
`;

const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  box-sizing: border-box;
  border: 1rem solid;
  border-color: ${colors.slice(0, 4).join(" ")};
  border-radius:50%;
  background-color: ${colors[4]}
  animation: ${spin} 2s linear infinite;
`;

const LoadingIcon = () => {
  return (
    <StyledWrapper>
      <StyledLoader />
    </StyledWrapper>
  );
};

export default LoadingIcon;
