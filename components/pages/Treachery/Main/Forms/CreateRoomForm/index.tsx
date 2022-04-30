import { FormProps } from '../types'

import Select from '../../../../../atoms/Select'

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
  <div className='flex flex-col lg:flex-row'>
    <Select
      label='Number of Players'
      options={playerOptions.map(x => x.toString())}
      value={players.toString()}
      onChange={val => onChange('players')(val as string)}
      className='mx-0 my-2 lg:mx-2 lg:my-0 w-full'
      labelClass='w-[inherit] lg:w-max'
    />

    <Select
      label='Role Rarity'
      options={rarityOptions}
      value={rarity}
      onChange={val => onChange('rarity')(val as string)}
      className='mx-0 my-2 lg:mx-2 lg:my-0 w-full'
      labelClass='w-[inherit] lg:w-max'
    />
  </div>
)

export default CreateRoomForm
