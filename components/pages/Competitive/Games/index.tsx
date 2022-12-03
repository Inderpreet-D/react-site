import clsx from 'clsx'
import { isEqual } from 'lodash'
import { format as dateFormat } from 'date-fns'

import { Game } from '..'

import ContainerSubTitle from '../../../atoms/ContainerSubTitle'
import Button from '../../../atoms/Button'

type GamesProps = {
  games: Game[]
  year: number
}

type DeckType = {
  commander: string
  theme?: string
  tribe?: string
  companion?: string
}

const getDate = (date: Date): string => {
  return dateFormat(date, 'MMM do, y')
}

const getTypePrefix = (type: string): string => {
  return `${type}::`
}

const getNameForType = (type: string, types: string[]): string | undefined => {
  const prefix = getTypePrefix(type)
  const found = types.find(s => s.startsWith(prefix))

  if (!found) {
    return undefined
  }

  return found.split(prefix)[1]
}

const extractDeckData = (deck: string): DeckType => {
  const [commander, ...rest] = deck.split('--').map(s => s.trim())

  const theme = getNameForType('T', rest)
  const tribe = getNameForType('G', rest)
  const companion = getNameForType('C', rest)

  return {
    commander,
    theme,
    tribe,
    companion
  }
}

const cellClassName = 'p-2 text-left'

const Games: React.FC<GamesProps> = ({ games, year }) => {
  const [game, setGame] = React.useState<Game | null>(null)

  const formattedGames = React.useMemo(() => {
    const withDate = games.map(g => {
      const { month, day } = g
      const date = new Date(year, month - 1, day)

      return {
        ...g,
        date
      }
    })

    return withDate
  }, [games, year])

  const [showTheme, showTribe, showCompanion] = React.useMemo(() => {
    if (!game) {
      return [false, false, false]
    }

    const decks = Object.values(game.players)
    const hasType = (type: string) =>
      decks.some(deck => deck.includes(getTypePrefix(type)))

    const showTheme = hasType('T')
    const showTribe = hasType('G')
    const showCompanion = hasType('C')

    return [showTheme, showTribe, showCompanion]
  }, [game])

  // De-select when changing seasons
  React.useEffect(() => {
    setGame(null)
  }, [games])

  return (
    <>
      <ContainerSubTitle style={{ marginBottom: '1rem' }}>
        Games
      </ContainerSubTitle>

      <div className='grid grid-cols-1 gap-8 p-8 lg:grid-cols-3 sm:grid-cols-2'>
        {formattedGames.map((g, i) => (
          <Button
            key={i}
            active={isEqual(g, game)}
            onClick={() => setGame(old => (isEqual(old, g) ? null : g))}
          >
            {getDate(g.date)}
          </Button>
        ))}
      </div>

      {game && (
        <div className='overflow-x-auto'>
          <table className='mx-0 my-4 w-full border-collapse'>
            <thead>
              <tr className='bg-dark-dark text-dark-light'>
                <th className={cellClassName}>Player</th>

                <th className={cellClassName}>Commander</th>

                {showTheme && <th className={cellClassName}>Theme</th>}

                {showTribe && <th className={cellClassName}>Tribe</th>}

                {showCompanion && <th className={cellClassName}>Companion</th>}
              </tr>
            </thead>

            <tbody>
              {Object.entries(game.players).map(data => {
                const [name, deck] = data
                const {
                  commander,
                  theme = 'N/A',
                  tribe = 'N/A',
                  companion = 'N/A'
                } = extractDeckData(deck)

                return (
                  <tr
                    key={name}
                    className={clsx(
                      'border-b border-b-dark-dark text-white transition-all duration-500',
                      name === game.winner && 'bg-primary-light text-dark-dark',
                      'hover:bg-dark-dark hover:text-white'
                    )}
                  >
                    <td className={cellClassName}>{name}</td>

                    <td className={cellClassName}>{commander}</td>

                    {showTheme && <td className={cellClassName}>{theme}</td>}

                    {showTribe && <td className={cellClassName}>{tribe}</td>}

                    {showCompanion && (
                      <td className={cellClassName}>{companion}</td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Games
