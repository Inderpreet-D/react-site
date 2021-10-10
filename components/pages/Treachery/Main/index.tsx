import { ChangeEvent, FormEvent } from 'react'

import { Rarity } from '../../../../shared/treachery'

import Button from '../../../atoms/Button'
import { StyledButtonHolder, StyledForm } from './styles'
import JoinRoomForm from './Forms/JoinRoomForm'
import CreateRoomForm from './Forms/CreateRoomForm'

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

export type ChangeHandler = (
  prop: string
) => (e: ChangeEvent<HTMLInputElement>) => void

const Main: React.FC<MainProps> = ({ onJoin, onCreate, resetError }) => {
  const [isJoining, setIsJoining] = React.useState(true)
  const [canRejoin, setCanRejoin] = React.useState(false)
  const [values, setValues] = React.useState<Values>({
    code: '',
    rarity: rarityOptions[0],
    players: playerOptions[0]
  })

  React.useEffect(() => {
    setCanRejoin(window.sessionStorage.getItem('id') !== null)
  }, [])

  const handleSwitch = React.useCallback(
    (val: boolean) => () => {
      setIsJoining(val)
      resetError()
    },
    [resetError]
  )

  const handleChange = React.useCallback(
    (prop: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
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
    (event: FormEvent) => {
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
      <StyledButtonHolder>
        <Button disabled={isJoining} onClick={handleSwitch(true)}>
          Join Room
        </Button>
        <Button disabled={!isJoining} onClick={handleSwitch(false)}>
          Create Room
        </Button>
        {canRejoin && <Button onClick={handleRejoin}>Rejoin Room</Button>}
      </StyledButtonHolder>

      <StyledForm onSubmit={submitForm}>
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

        <Button type='submit' disabled={isJoining && values.code.length !== 4}>
          {isJoining ? 'Join' : 'Create'}
        </Button>
      </StyledForm>
    </>
  )
}

export default Main
