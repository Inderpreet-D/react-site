import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'

import { Rarity } from '../../../../shared/treachery'

import Button from '../../../atoms/Button'
import JoinRoomForm from './Forms/JoinRoomForm'
import CreateRoomForm from './Forms/CreateRoomForm'

import {
  selectTreachery,
  resetError,
  setJoining,
  joinRoom,
  joinSavedRoom,
  createRoom,
  setValues
} from '../../../../slices/treachery'

const Main = () => {
  const dispatch = useAppDispatch()

  const { canRejoin, isJoining, values } = useAppSelector(selectTreachery)

  const handleSwitch = React.useCallback(
    (val: boolean) => () => {
      dispatch(setJoining(val))
      dispatch(resetError())
    },
    [dispatch]
  )

  const handleChange = React.useCallback(
    (prop: string) => (val: string) => {
      dispatch(setValues({ prop, val }))
    },
    [dispatch]
  )

  const handleRejoin = React.useCallback(() => {
    dispatch(joinSavedRoom())
  }, [dispatch])

  const submitForm = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      const { code, players, rarity } = values

      if (isJoining) {
        dispatch(joinRoom(code))
      } else {
        dispatch(createRoom(players, rarity as Rarity))
      }
    },
    [values, isJoining, dispatch]
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
          <CreateRoomForm values={values} onChange={handleChange} />
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
