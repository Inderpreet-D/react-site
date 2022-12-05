import { useAppSelector } from '../../../../hooks/redux'

import { Rarity } from '../../../../shared/treachery'

import Button from '../../../atoms/Button'
import JoinRoomForm from './Forms/JoinRoomForm'
import CreateRoomForm from './Forms/CreateRoomForm'

import { selectTreachery } from '../../../../slices/treachery'

const rarityOptions = ['Uncommon', 'Rare', 'Mythic']
const playerOptions = [4, 5, 6, 7, 8]

type MainProps = {
  onJoin: (roomCode: string) => Promise<void>
  onCreate: (numPlayers: number, rarity: Rarity) => Promise<void>
  resetError: () => void
}

export type Values = {
  code: string
  rarity: string
  players: number
}

export type ChangeHandler = (prop: string) => (val: string) => void

const Main: React.FC<MainProps> = ({ onJoin, onCreate, resetError }) => {
  const { canRejoin } = useAppSelector(selectTreachery)

  const [isJoining, setIsJoining] = React.useState(true)
  const [values, setValues] = React.useState<Values>({
    code: '',
    rarity: rarityOptions[0],
    players: playerOptions[0]
  })

  const handleSwitch = React.useCallback(
    (val: boolean) => () => {
      setIsJoining(val)
      resetError()
    },
    [resetError]
  )

  const handleChange = React.useCallback(
    (prop: string) => (val: string) => {
      if (prop === 'code') {
        if (val.length <= 4) {
          setValues(old => ({ ...old, code: val.toUpperCase().trim() }))
        }
      } else {
        setValues(old => ({ ...old, [prop]: val }))
      }
    },
    []
  )

  const handleRejoin = React.useCallback(() => {
    onJoin(window.sessionStorage.getItem('roomCode')!)
  }, [onJoin])

  const submitForm = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      const { code, players, rarity } = values

      if (isJoining) {
        onJoin(code)
      } else {
        onCreate(players, rarity as Rarity)
      }
    },
    [values, isJoining, onJoin, onCreate]
  )

  return (
    <>
      <div className='flex flex-col items-center justify-center sm:flex-row mb-4'>
        <Button
          disabled={isJoining}
          onClick={handleSwitch(true)}
          className='w-full sm:w-auto'
        >
          Join Room
        </Button>

        <Button
          disabled={!isJoining}
          onClick={handleSwitch(false)}
          className='mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto'
        >
          Create Room
        </Button>

        {canRejoin && (
          <Button
            onClick={handleRejoin}
            className='mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto'
          >
            Rejoin Room
          </Button>
        )}
      </div>

      <form onSubmit={submitForm} className='flex items-center justify-center'>
        {isJoining ? (
          <JoinRoomForm values={values} onChange={handleChange} />
        ) : (
          <CreateRoomForm
            values={values}
            onChange={handleChange}
            playerOptions={playerOptions}
            rarityOptions={rarityOptions}
          />
        )}

        <Button
          type='submit'
          disabled={isJoining && values.code.length !== 4}
          className='ml-4'
        >
          {isJoining ? 'Join' : 'Create'}
        </Button>
      </form>
    </>
  )
}

export default Main
