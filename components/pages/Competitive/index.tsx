import dynamic from 'next/dynamic'
import { isEqual } from 'lodash'

import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
const LoadingIcon = dynamic(() => import('../../atoms/LoadingIcon'))
const HorizontalList = dynamic(() => import('../../atoms/HorizontalList'))
const HorizontalListButton = dynamic(() =>
  import('../../atoms/HorizontalListButton')
)
const ContainerSectionSeparator = dynamic(() =>
  import('../../atoms/ContainerSectionSeparator')
)
const Rules = dynamic(() => import('./Rules'))
const Games = dynamic(() => import('./Games'))
const Leaderboard = dynamic(() => import('./Leaderboard'))

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
  name: string
  year: number
  games: Game[]
  rules: string[]
}

const meme = `
———————————— No games? ———————————
⠀⣞⢽⢪⢣⢣⢣⢫⡺⡵⣝⡮⣗⢷⢽⢽⢽⣮⡷⡽⣜⣜⢮⢺⣜⢷⢽⢝⡽⣝
⠸⡸⠜⠕⠕⠁⢁⢇⢏⢽⢺⣪⡳⡝⣎⣏⢯⢞⡿⣟⣷⣳⢯⡷⣽⢽⢯⣳⣫⠇
⠀⠀⢀⢀⢄⢬⢪⡪⡎⣆⡈⠚⠜⠕⠇⠗⠝⢕⢯⢫⣞⣯⣿⣻⡽⣏⢗⣗⠏⠀ 
⠀⠪⡪⡪⣪⢪⢺⢸⢢⢓⢆⢤⢀⠀⠀⠀⠀⠈⢊⢞⡾⣿⡯⣏⢮⠷⠁⠀⠀⠀
⠀⠀⠀⠈⠊⠆⡃⠕⢕⢇⢇⢇⢇⢇⢏⢎⢎⢆⢄⠀⢑⣽⣿⢝⠲⠉⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⡿⠂⠠⠀⡇⢇⠕⢈⣀⠀⠁⠡⠣⡣⡫⣂⣿⠯⢪⠰⠂⠀⠀⠀⠀
⠀⠀⠀⠀⡦⡙⡂⢀⢤⢣⠣⡈⣾⡃⠠⠄⠀⡄⢱⣌⣶⢏⢊⠂⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⢝⡲⣜⡮⡏⢎⢌⢂⠙⠢⠐⢀⢘⢵⣽⣿⡿⠁⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠨⣺⡺⡕⡕⡱⡑⡆⡕⡅⡕⡜⡼⢽⡻⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⣼⣳⣫⣾⣵⣗⡵⡱⡡⢣⢑⢕⢜⢕⡝⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣴⣿⣾⣿⣿⣿⡿⡽⡑⢌⠪⡢⡣⣣⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⡟⡾⣿⢿⢿⢵⣽⣾⣼⣘⢸⢸⣞⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠁⠇⠡⠩⡫⢿⣝⡻⡮⣒⢽⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
——————————————————————————————————
`

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

              {season.games ? (
                <>
                  <Games games={season.games} year={season.year} />

                  <ContainerSectionSeparator />

                  <Leaderboard season={season} />
                </>
              ) : (
                <div>
                  <pre className='w-fit mx-auto mt-[-1rem]'>{meme}</pre>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default Page
