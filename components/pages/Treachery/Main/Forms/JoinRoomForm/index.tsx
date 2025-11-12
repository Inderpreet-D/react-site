import { useAppSelector } from "../../../../../../hooks/redux";

import { FormProps } from "../types";

import TextField from "../../../../../atoms/TextField";

import { selectTreachery } from "../../../../../../slices/treachery";

const JoinRoomForm: React.FC<FormProps> = ({ onChange }) => {
  const { values } = useAppSelector(selectTreachery);

  return (
    <TextField
      onChange={(e) => onChange("code")(e.target.value)}
      value={values.code}
      placeholder="4-Letter Room Code"
      aria-label="Room code"
      className="w-60"
    />
  );
};

export default JoinRoomForm;
