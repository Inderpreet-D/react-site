import { Fragment } from "react";
import { FormControl, InputLabel, Select, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "20%",
  },
}));

const CreateRoomForm = ({
  selectedPlayerNum,
  onPlayerNumSelected,
  selectedRarity,
  onRaritySelected,
  playerOptions,
  rarityOptions,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <FormControl
        variant="filled"
        className={classes.formControl}
        color="secondary"
      >
        <InputLabel htmlFor="player-select">Number of Players</InputLabel>
        <Select
          native
          value={selectedPlayerNum}
          onChange={onPlayerNumSelected}
          inputProps={{
            id: "player-select",
          }}
        >
          {playerOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl
        variant="filled"
        className={classes.formControl}
        color="secondary"
      >
        <InputLabel htmlFor="rarity-select">Role Rarity</InputLabel>
        <Select
          native
          value={selectedRarity}
          onChange={onRaritySelected}
          inputProps={{
            id: "rarity-select",
          }}
        >
          {rarityOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      </FormControl>
    </Fragment>
  );
};

export default CreateRoomForm;
