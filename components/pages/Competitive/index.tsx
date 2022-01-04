import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'

import useSWR from '../../../hooks/useSWR'

type PlayerObj = {
  [x: string]: string
}

type Game = {
  month: number
  day: number
  players: PlayerObj
  winner: string
}

export interface Season {
  name?: string
  year: number
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

      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <div>Button bar</div>

          <div>Rules</div>

          <div>Leaderboard</div>

          <div>Games per season</div>
        </>
      )}
    </Container>
  )
}

export default Page
