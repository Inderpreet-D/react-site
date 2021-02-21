import StyledTextField from "./JoinRoomForm.styles";

const JoinRoomForm = ({ values: { code }, onChange }) => (
  <StyledTextField
    onChange={onChange("code")}
    value={code}
    placeholder="4-Letter Room Code"
  />
);

export default JoinRoomForm;
