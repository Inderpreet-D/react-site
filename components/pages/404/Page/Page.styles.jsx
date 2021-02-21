import styled from "styled-components";

import Container from "../../../atoms/Container";

const StyledErrorBox = styled(Container)`
  position: absolute;
  left: 50%;
  top: 50%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  display: flex;
  transform: translate(-50%, -50%);

  width: max-content;
`;

const StyledLink = styled.a`
  cursor: pointer;

  color: ${({ theme }) => theme.foreground};

  &:hover {
    text-decoration: underline;
  }
`;

export { StyledErrorBox, StyledLink };
