import styled from "styled-components";

import Select from "../../../../atoms/Select";

const StyledSelect = styled(Select)`
  margin: 0.5rem;
  width: 20%;
`;

const CreateRoomForm = ({
  selectedPlayerNum,
  onPlayerNumSelected,
  selectedRarity,
  onRaritySelected,
  playerOptions,
  rarityOptions,
}) => (
  <>
    <StyledSelect
      id="player-select"
      label="Number of Players"
      options={playerOptions}
      value={selectedPlayerNum}
      onChange={onPlayerNumSelected}
    />

    <StyledSelect
      id="rarity-select"
      label="Role Rarity"
      options={rarityOptions}
      value={selectedRarity}
      onChange={onRaritySelected}
    />
  </>
);

export default CreateRoomForm;
