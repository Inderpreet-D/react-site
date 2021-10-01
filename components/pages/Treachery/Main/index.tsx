import { StyledButtonHolder, StyledForm } from './styles'
import Button from '../../../atoms/Button'
import { JoinRoomForm, CreateRoomForm } from './Forms'

const rarityOptions = ['Uncommon', 'Rare', 'Mythic']
const playerOptions = ['4', '5', '6', '7', '8']

const Main = ({ onJoin, onCreate, resetError }) => {
  const [isJoining, setIsJoining] = React.useState(true)
  const [canRejoin, setCanRejoin] = React.useState(false)
  const [values, setValues] = React.useState({
    code: '',
    rarity: rarityOptions[0],
    players: playerOptions[0]
  })

  React.useEffect(() => {
    setCanRejoin(window.sessionStorage.getItem('id') !== null)
  }, [])

  const handleSwitch = val => () => {
    setIsJoining(val)
    resetError()
  }

  const handleChange = prop => e => {
    const val = e.target.value
    if (prop === 'code') {
      if (val.length <= 4) {
        setValues({ ...values, code: val.toUpperCase().trim() })
      }
    } else {
      setValues({ ...values, [prop]: val })
    }
  }

  const handleRejoin = () => {
    onJoin(window.sessionStorage.getItem('roomCode'))
  }

  const submitForm = event => {
    event.preventDefault()

    if (isJoining) {
      onJoin(values.code)
    } else {
      onCreate(values.players, values.rarity)
    }
  }

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
