import styled from "styled-components";
import alpha from "color-alpha";

import TextField from "../../../../atoms/TextField";

const StyledHolder = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;

  display: flex;

  transition: all 1s;

  margin: 0.5rem 1rem 0.5rem 0;
  border-radius: 1rem;
  box-sizing: border-box;
  width: calc(100% - 1rem);
  padding: 1rem;

  &:hover {
    background-color: ${({ theme }) => alpha(theme.accent, 0.25)};
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledText = styled.div`
  margin-top: 1rem;

  font-size: 1.25rem;
  font-family: "Courier New", Courier, monospace;
  word-break: break-word;
`;

export { StyledHolder, StyledTextField, StyledText };
