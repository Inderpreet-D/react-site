import styled from "styled-components";

import TextField from "../../../../atoms/TextField";

const StyledTextField = styled(TextField)`
  width: 15rem;
`;

const JoinRoomForm = ({ values: { code }, onChange }) => (
  <StyledTextField
    onChange={onChange("code")}
    value={code}
    placeholder="4-Letter Room Code"
  />
);

export default JoinRoomForm;
