import { Game } from '..'

type GamesProps = {
  games: Game[]
  year: number
}

const Games: React.FC<GamesProps> = ({ games, year }) => {
  const [game, setGame] = React.useState<Game | null>(null)

  return (
    <>
      <div>Games</div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {games.map((game, i) => (
          <div key={i} onClick={() => setGame(game)}>
            {game.month}/{game.day} {year}
          </div>
        ))}
      </div>

      {game && (
        <>
          {Object.entries(game.players).map(([name, deck], i) => (
            <div key={i}>
              {name} -&gt; {deck}
            </div>
          ))}

          <div>Winner: {game.winner ?? 'DRAW/STALEMATE'}</div>
        </>
      )}
    </>
  )
}

export default Games
