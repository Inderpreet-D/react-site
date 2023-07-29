import { useAppSelector } from '../../../../../../hooks/redux'

import { FormProps } from '../types'

import Select from '../../../../../atoms/Select'

import {
  playerOptions,
  rarityOptions,
  selectTreachery
} from '../../../../../../slices/treachery'

const CreateRoomForm: React.FC<FormProps> = ({ onChange }) => {
  const { values } = useAppSelector(selectTreachery)

  return (
    <div className='flex flex-col lg:flex-row'>
      <Select
        label='Number of Players'
        options={playerOptions.map(x => x.toString())}
        value={values.players.toString()}
        onChange={val => onChange('players')(val as string)}
        className='mx-0 my-2 lg:mx-2 lg:my-0 w-full'
        labelClass='w-[inherit] lg:w-max'
      />

      <Select
        label='Role Rarity'
        options={rarityOptions}
        value={values.rarity}
        onChange={val => onChange('rarity')(val as string)}
        className='mx-0 my-2 lg:mx-2 lg:my-0 w-full'
        labelClass='w-[inherit] lg:w-max'
      />
    </div>
  )
}

export default CreateRoomForm
