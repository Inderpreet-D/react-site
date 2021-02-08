import styled from "styled-components";
import alpha from "color-alpha";

import TextField from "../../../atoms/TextField";

import { encode } from "../../../../utilities/secret-helper";

const StyledHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 1rem);
  padding: 1rem;
  margin: 0.5rem 1rem 0.5rem 0;
  box-sizing: border-box;
  border-radius: 1rem;
  transition: all 1s;

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

const MessageBlock = ({ value, onChange, secret }) => (
  <StyledHolder>
    <StyledTextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter text to encrypt"
    />
    <StyledText>"{encode(secret, value)}"</StyledText>
  </StyledHolder>
);

export default MessageBlock;
