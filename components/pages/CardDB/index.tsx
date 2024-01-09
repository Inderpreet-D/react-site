import { CARD_DB_SEARCH } from '../../../pages/api/socket/handlers/cardDB'
import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'

import { useSocket } from '../../templates/Page/providers/SocketProvider'

const Page = () => {
  const socket = useSocket()

  React.useEffect(() => {
    if (!socket) {
      return
    }

    socket.emit(CARD_DB_SEARCH, { name: 'test' }, data => {
      console.log({ data })
    })
  }, [socket])

  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle>Your Collection</ContainerTitle>
    </Container>
  )
}

export default Page
