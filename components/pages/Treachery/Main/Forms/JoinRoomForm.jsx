import TextField from "../../../../atoms/TextField";

const JoinRoomForm = ({ value, onChange }) => (
  <TextField
    onChange={onChange}
    value={value}
    placeholder="4-Letter Room Code"
    required
  />
);

export default JoinRoomForm;
