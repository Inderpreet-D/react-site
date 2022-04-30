import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar
} from 'recharts'

import { Season } from '..'

import ContainerSubTitle from '../../../atoms/ContainerSubTitle'
import TT from './TT'

type LeaderboardProps = {
  season: Season
}

const extractLeaderboard = (season: Season): { [x: string]: number } => {
  const wins = new Map<string, number>()

  season.games.forEach(game => {
    if (game.winner) {
      wins.set(game.winner, (wins.get(game.winner) ?? 0) + 1)
    }
  })

  const winsObj = [...wins.entries()].reduce((prev, [name, val]) => {
    return { ...prev, [name]: val }
  }, {})

  return winsObj
}

const Leaderboard: React.FC<LeaderboardProps> = ({ season }) => {
  const leaderboard = React.useMemo(() => extractLeaderboard(season), [season])

  const data = React.useMemo(() => {
    const entries = Object.entries(leaderboard)
    const formatted = entries.map(([name, Win]) => ({ name, Win }))
    const sorted = formatted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  }, [leaderboard])

  return (
    <>
      <ContainerSubTitle style={{ marginBottom: '1rem' }}>
        Leaderboard
      </ContainerSubTitle>

      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            width={500}
            height={300}
            margin={{
              top: 0,
              right: 16,
              left: -32,
              bottom: 0
            }}
          >
            <XAxis dataKey='name' />

            <YAxis allowDecimals={false} />

            <Tooltip content={<TT />} />

            <Bar dataKey='Win' fill='rgba(15, 23, 42, 1)' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Leaderboard
