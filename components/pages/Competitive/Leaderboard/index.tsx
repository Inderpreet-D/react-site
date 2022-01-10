import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar
} from 'recharts'
import { useTheme } from 'styled-components'

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
  const theme = useTheme()

  const leaderboard = React.useMemo(() => extractLeaderboard(season), [season])

  const data = React.useMemo(() => {
    const entries = Object.entries(leaderboard)
    const formatted = entries.map(([name, Win]) => ({ name, Win }))
    return formatted
  }, [leaderboard])

  return (
    <>
      <ContainerSubTitle style={{ marginBottom: '1rem' }}>
        Leaderboard
      </ContainerSubTitle>

      <ResponsiveContainer width='100%' aspect={2}>
        <BarChart data={data} width={500} height={300}>
          <XAxis dataKey='name' />

          <YAxis allowDecimals={false} />

          <Tooltip content={<TT />} />

          <Bar dataKey='Win' fill={theme.foregroundDark} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default Leaderboard
