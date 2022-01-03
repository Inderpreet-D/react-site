import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'

const Page = () => {
  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle>Competitive</ContainerTitle>
    </Container>
  )
}

export default Page
