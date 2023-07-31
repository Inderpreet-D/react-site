import { useAppSelector } from '../../../hooks/redux'

import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import ContainerError from '../../atoms/ContainerError'
import Main from './Main'
import Room from './Room'
import Card from './Card'
import LoadingIcon from '../../atoms/LoadingIcon'

import { State, selectTreachery } from '../../../slices/treachery'
import useTreacherySetup from './hooks/useTreacherySetup'
import useTreacheryPolling from './hooks/useTreacheryPolling'
import useSocket from '../../../hooks/useSocket'
import { TREACHERY_TEST } from '../../../pages/api/socket/handlers/treachery'

const Page = () => {
  useTreacherySetup()
  useTreacheryPolling()

  const socket = useSocket()

  const { state, error } = useAppSelector(selectTreachery)

  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle
        onClick={() => {
          if (socket) {
            socket.emit(TREACHERY_TEST, { a: 1, b: '2_3' }, res => {
              console.log({ res })
            })
          }
        }}
      >
        MTG Treachery
      </ContainerTitle>

      {error && <ContainerError>Error: {error}</ContainerError>}

      {state === State.Main && <Main />}

      {state === State.Room && <Room />}

      {state === State.Card && <Card />}

      {state === State.Load && <LoadingIcon />}
    </Container>
  )
}

export default Page
