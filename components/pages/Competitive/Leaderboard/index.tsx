import { Season } from '..'

type LeaderboardProps = {
  season: Season
}

const extractLeaderboard = (season: Season): { [x: string]: number } => {
  const wins = new Map<string, number>()

  season.games.forEach(game => {
    wins.set(game.winner, (wins.get(game.winner) ?? 0) + 1)
  })

  const winsObj = [...wins.entries()].reduce((prev, [name, val]) => {
    return { ...prev, [name]: val }
  }, {})

  return winsObj
}

const Leaderboard: React.FC<LeaderboardProps> = ({ season }) => {
  const leaderboard = React.useMemo(() => extractLeaderboard(season), [season])

  return (
    <>
      <div>Leaderboard</div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Object.entries(leaderboard).map(([name, wins], i) => (
          <div key={i}>
            {name} =&gt; {wins}
          </div>
        ))}
      </div>
    </>
  )
}

export default Leaderboard
