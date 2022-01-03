import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'

import useSWR from '../../../hooks/useSWR'

type PlayerObj = {
  [x: string]: string
}

type Game = {
  date: string
  players: PlayerObj
  winner: string
}

interface Season {
  name?: string
  games: Game[]
  rules: string[]
}

const Page = () => {
  const { data: seasons, isLoading } = useSWR<Season[]>('competitive')

  React.useEffect(() => {
    if (seasons) {
      console.log({ seasons })
    }
  }, [seasons])

  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle>Competitive</ContainerTitle>

      {isLoading ? <LoadingIcon /> : <></>}
    </Container>
  )
}

export default Page
