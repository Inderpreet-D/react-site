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

const Page = () => {
  useTreacherySetup()
  useTreacheryPolling()

  const { state, roomState, cardState, error } = useAppSelector(selectTreachery)

  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle>MTG Treachery</ContainerTitle>

      {error && <ContainerError>Error: {error}</ContainerError>}

      {state === State.Main && <Main />}

      {state === State.Room && <Room {...roomState} />}

      {state === State.Card && <Card {...cardState} />}

      {state === State.Load && <LoadingIcon />}
    </Container>
  )
}

export default Page
