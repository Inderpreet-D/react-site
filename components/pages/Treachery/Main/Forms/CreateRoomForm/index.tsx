import { ChangeEventHandler } from 'react'
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
      value={players}
      onChange={
        (onChange('players') as unknown) as ChangeEventHandler<
          HTMLSelectElement
        >
      }
    />

    <StyledSelect
      label='Role Rarity'
      options={rarityOptions}
      value={rarity}
      onChange={
        (onChange('rarity') as unknown) as ChangeEventHandler<HTMLSelectElement>
      }
    />
  </StyledContainer>
)

export default CreateRoomForm
