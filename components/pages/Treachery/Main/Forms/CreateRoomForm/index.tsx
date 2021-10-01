import { StyledContainer, StyledSelect } from './styles'

const CreateRoomForm = ({
  values: { rarity, players },
  onChange,
  playerOptions,
  rarityOptions
}) => (
  <StyledContainer>
    <StyledSelect
      label='Number of Players'
      options={playerOptions}
      value={players}
      onChange={onChange('players')}
    />

    <StyledSelect
      label='Role Rarity'
      options={rarityOptions}
      value={rarity}
      onChange={onChange('rarity')}
    />
  </StyledContainer>
)

export default CreateRoomForm
