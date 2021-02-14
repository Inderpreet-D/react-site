import styled from "styled-components";

import Select from "../../../../atoms/Select";

const StyledSelect = styled(Select)`
  margin: 0 0.5rem;
  width: 20%;
`;

const CreateRoomForm = ({
  values: { rarity, players },
  onChange,
  playerOptions,
  rarityOptions,
}) => (
  <>
    <StyledSelect
      label="Number of Players"
      options={playerOptions}
      value={players}
      onChange={onChange("players")}
    />

    <StyledSelect
      label="Role Rarity"
      options={rarityOptions}
      value={rarity}
      onChange={onChange("rarity")}
    />
  </>
);

export default CreateRoomForm;
