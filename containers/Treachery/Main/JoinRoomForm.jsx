import { TextField } from "@material-ui/core";

const JoinRoomForm = ({ value, formChange }) => {
    return (
        <TextField
            variant="filled"
            color="secondary"
            label="4-Letter Room Code"
            onChange={formChange}
            value={value}
            inputProps={{ pattern: "[a-zA-Z]{4}" }}
            required
        />
    );
};

export default JoinRoomForm;
