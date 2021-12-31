import { Rarity } from '../../../shared/treachery'
import {
  CardResponse,
  CreateResponse,
  JoinResponse,
  RoomResponse
} from '../../../pages/api/treachery/types'

import Main from './Main'
import Room, { RoomState } from './Room'
import Card from './Card'

import Container from '../../atoms/Container'
import ContainerError from '../../atoms/ContainerError'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'

import { treachery } from '../../../lib/api'

enum State {
  Main,
  Room,
  Card,
  Load
}

const Page = () => {
  const [state, setState] = React.useState<State>(State.Main)
  const [roomState, setRoomState] = React.useState<RoomState>({
    roomCode: '',
    numPlayers: 0,
    roomSize: -1
  })
  const [cardState, setCardState] = React.useState<CardResponse>(
    {} as CardResponse
  )
  const [error, setError] = React.useState<string | null>(null)

  const waitForRoom = React.useCallback(async () => {
    if (state !== State.Room) {
      return
    }

    const data = await treachery<RoomResponse>({
      action: 'room',
      roomCode: roomState.roomCode
    })
    const { currentPlayers, numPlayers } = data

    setRoomState(state => ({
      ...state,
      numPlayers: currentPlayers,
      roomSize: numPlayers
    }))

    if (currentPlayers !== numPlayers) {
      return
    }

    const res = await treachery<CardResponse>({
      action: 'card',
      roomCode: roomState.roomCode,
      id: window.sessionStorage.getItem('id')!
    })

    setCardState(res)
    setState(State.Card)
  }, [roomState.roomCode, state])

  React.useEffect(() => {
    const roomFillInterval = setInterval(waitForRoom, 1000)

    return () => {
      clearInterval(roomFillInterval)
    }
  }, [waitForRoom])

  const startLoading = React.useCallback(() => {
    setState(State.Load)
    setError(null)
  }, [])

  const showError = React.useCallback((err: string) => {
    setError(err)
    setState(State.Main)
  }, [])

  const showRoom = React.useCallback((id: string, roomCode: string) => {
    setState(State.Room)

    window.sessionStorage.setItem('id', id)
    window.sessionStorage.setItem('roomCode', roomCode)
  }, [])

  const handleJoin = React.useCallback(
    async (roomCode: string) => {
      startLoading()

      const id = window.sessionStorage.getItem('id')!

      const data = await treachery<JoinResponse>({
        action: 'join',
        roomCode,
        id
      })
      const {
        error,
        currentPlayers,
        numPlayers,
        id: roomID,
        roomCode: responseCode
      } = data

      if (error) {
        showError(error)
      } else {
        setRoomState({
          roomCode: responseCode,
          roomSize: numPlayers,
          numPlayers: currentPlayers
        })

        showRoom(roomID, responseCode)
      }
    },
    [showError, startLoading, showRoom]
  )

  const handleCreate = React.useCallback(
    async (numPlayers: number, rarity: Rarity) => {
      startLoading()

      const data = await treachery<CreateResponse>({
        action: 'create',
        numPlayers,
        rarity
      })
      const { roomCode, id } = data

      setRoomState({ roomCode, roomSize: numPlayers, numPlayers: 1 })
      showRoom(id, roomCode)
    },
    [startLoading, showRoom]
  )

  return (
    <Container>
      <ContainerTitle>MTG Treachery</ContainerTitle>

      {error && <ContainerError>Error: {error}</ContainerError>}

      {state === State.Main && (
        <Main
          onJoin={handleJoin}
          onCreate={handleCreate}
          resetError={() => setError('')}
        />
      )}

      {state === State.Room && <Room {...roomState} />}

      {state === State.Card && <Card {...cardState} />}

      {state === State.Load && <LoadingIcon />}
    </Container>
  )
}

export default Page
