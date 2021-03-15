import {
  StyledHolder,
  StyledTextField,
  StyledText,
} from "./MessageBlock.styles";
import { encode } from "../../../../../utilities/helpers/secret";

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
