import { FormProps } from '../types'

import { StyledContainer, StyledSelect } from './styles'

type CreateRoomProps = FormProps & {
  playerOptions: number[]
  rarityOptions: string[]
}

const CreateRoomForm: React.FC<CreateRoomProps> = ({
  values: { rarity, players },
  onChange,
  playerOptions,
  rarityOptions
}) => (
  <StyledContainer>
    <StyledSelect
      label='Number of Players'
      options={playerOptions.map(x => x.toString())}
      value={players.toString()}
      onChange={val => onChange('players')(val as string)}
    />

    <StyledSelect
      label='Role Rarity'
      options={rarityOptions}
      value={rarity}
      onChange={val => onChange('rarity')(val as string)}
    />
  </StyledContainer>
)

export default CreateRoomForm
