import { isEqual } from 'lodash'
import { format as dateFormat } from 'date-fns'

import { Game } from '..'

import ContainerSubTitle from '../../../atoms/ContainerSubTitle'
import HorizontalList from '../../../atoms/HorizontalList'
import HorizontalListButton from '../../../atoms/HorizontalListButton'

import { Table, HeaderRow, Row, HeaderCell, DataCell } from './styles'

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

  return (
    <>
      <ContainerSubTitle style={{ marginBottom: '1rem' }}>
        Games
      </ContainerSubTitle>

      <HorizontalList>
        {formattedGames.map((g, i) => (
          <HorizontalListButton
            key={i}
            active={isEqual(g, game)}
            onClick={() => setGame(old => (isEqual(old, g) ? null : g))}
          >
            {getDate(g.date)}
          </HorizontalListButton>
        ))}
      </HorizontalList>

      {game && (
        <Table>
          <thead>
            <HeaderRow>
              <HeaderCell>Player</HeaderCell>

              <HeaderCell>Commander</HeaderCell>

              {showTheme && <HeaderCell>Theme</HeaderCell>}

              {showTribe && <HeaderCell>Tribe</HeaderCell>}

              {showCompanion && <HeaderCell>Companion</HeaderCell>}
            </HeaderRow>
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
                <Row key={name} winner={name === game.winner}>
                  <DataCell>{name}</DataCell>

                  <DataCell>{commander}</DataCell>

                  {showTheme && <DataCell>{theme}</DataCell>}

                  {showTribe && <DataCell>{tribe}</DataCell>}

                  {showCompanion && <DataCell>{companion}</DataCell>}
                </Row>
              )
            })}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default Games
