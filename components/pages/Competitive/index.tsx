import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'
import Rules from './Rules'
import Leaderboard from './Leaderboard'
import Games from './Games'

import useSWR from '../../../hooks/useSWR'

export type PlayerObj = {
  [x: string]: string
}

export type Game = {
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

  const [season, setSeason] = React.useState<Season | null>(null)

  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle>Competitive</ContainerTitle>

      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <div>
            {seasons.map((season, i) => (
              <div key={i} onClick={() => setSeason(season)}>
                {season.name ?? `Season ${i + 1}`}
              </div>
            ))}
          </div>

          {season && (
            <>
              <Rules rules={season.rules} />

              <Leaderboard season={season} />

              <Games games={season.games} year={season.year} />
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default Page
