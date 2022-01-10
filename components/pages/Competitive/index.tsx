import { isEqual } from 'lodash'

import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'
import HorizontalList from '../../atoms/HorizontalList'
import HorizontalListButton from '../../atoms/HorizontalListButton'
import ContainerSectionSeparator from '../../atoms/ContainerSectionSeparator'
import Rules from './Rules'
import Games from './Games'
import Leaderboard from './Leaderboard'

import useSWR from '../../../hooks/useSWR'

export type PlayerObj = {
  [x: string]: string
}

export type Game = {
  month: number
  day: number
  players: PlayerObj
  winner?: string
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
          <HorizontalList>
            {seasons.map((s, i) => (
              <HorizontalListButton
                key={i}
                active={isEqual(s, season)}
                onClick={() => setSeason(old => (isEqual(old, s) ? null : s))}
              >
                {s.name ?? `Season ${i + 1}`}
              </HorizontalListButton>
            ))}
          </HorizontalList>

          <ContainerSectionSeparator />

          {season && (
            <>
              <Rules rules={season.rules} />

              <ContainerSectionSeparator />

              <Games games={season.games} year={season.year} />

              <ContainerSectionSeparator />

              <Leaderboard season={season} />
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default Page
