import styled from "styled-components";

import TextField from "../../../../atoms/TextField";

const StyledContainer = styled.div`
  width: 15rem;
`;

const JoinRoomForm = ({ value, onChange }) => (
  <StyledContainer>
    <TextField
      onChange={onChange}
      value={value}
      placeholder="4-Letter Room Code"
      required
    />
  </StyledContainer>
);

export default JoinRoomForm;
