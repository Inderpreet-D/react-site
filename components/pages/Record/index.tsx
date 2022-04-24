import axios from 'axios'

import { Game, PlayerObj } from '../Competitive'

import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import Button from '../../atoms/Button'
import Select from '../../atoms/Select'
import TextInput from '../../atoms/TextInput'

import { reducer, initialState, Players } from './reducer'

const PASSWORD_URI = '/api/record/password'
const SEASONS_URI = '/api/record/seasons'
const RECORD_URI = '/api/record'

const getPlayerObj = (players: Players) => {
  const playerObj: PlayerObj = {}

  Object.values(players).forEach(vals => {
    const { name, commander, theme, tribe, companion } = vals

    if (commander.length && name.length) {
      const transformedVals = [commander]

      if (theme.length) {
        transformedVals.push(`T::${theme}`)
      }

      if (tribe.length) {
        transformedVals.push(`G::${tribe}`)
      }

      if (companion.length) {
        transformedVals.push(`C::${companion}`)
      }

      playerObj[name] = transformedVals.join(' -- ')
    }
  })

  return playerObj
}

const Page = () => {
  const [
    {
      addingSeason,
      seasonName,
      season,
      seasons,
      seasonsLoaded,
      players,
      winner,
      password
    },
    dispatch
  ] = React.useReducer(reducer, initialState)
  const [passValid, setPassValid] = React.useState(false)

  // Checks password
  React.useEffect(() => {
    const checkPass = async () => {
      try {
        const result = await axios.post(PASSWORD_URI, { password })
        const { match } = (result.data as unknown) as { match: boolean }
        setPassValid(match)
      } catch (err) {
        console.error('Error checking password', err)
      }
    }

    checkPass()
  }, [password])

  React.useEffect(() => {
    if (seasonsLoaded) {
      return
    }

    const handleGetSeasons = async () => {
      try {
        const result = await axios.get(SEASONS_URI)
        const { seasons } = (result.data as unknown) as { seasons: string[] }
        dispatch({ type: 'SET_SEASONS', seasons })
      } catch (err) {
        console.error('Error getting seasons', err)
      }
    }

    handleGetSeasons()
  }, [seasonsLoaded])

  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle>Add Competitive Record</ContainerTitle>

      <TextInput
        placeholder='Password'
        value={password}
        onChange={e =>
          dispatch({ type: 'SET_PASSWORD', password: e.target.value })
        }
        className='mt-4 mb-8'
      />

      <div className='flex items-center mb-4'>
        <div className='text-base text-white mr-2'>Season:</div>

        <Select
          options={seasons}
          value={season}
          onChange={val =>
            dispatch({ type: 'SET_SEASON', season: val as string })
          }
          className='mr-4'
        />

        {!addingSeason ? (
          <Button
            onClick={() => dispatch({ type: 'START_ADDING_SEASON' })}
            disabled={!passValid}
          >
            Add Season
          </Button>
        ) : (
          <TextInput
            autoFocus
            placeholder='Season Name'
            onKeyDown={async e => {
              if (e.key !== 'Enter') {
                return
              }

              dispatch({ type: 'END_ADDING_SEASON' })

              const result = await axios.post(SEASONS_URI, {
                name: seasonName
              })
              const { seasons } = (result.data as unknown) as {
                seasons: string[]
              }

              dispatch({ type: 'SET_SEASONS', seasons })
            }}
            onBlur={() => dispatch({ type: 'END_ADDING_SEASON' })}
            value={seasonName}
            onChange={e =>
              dispatch({ type: 'SET_SEASON_NAME', name: e.target.value })
            }
          />
        )}
      </div>

      <div className='table-fixed mt-4'>
        <div className='table-header-group'>
          <div className='table-row'>
            <div className='table-cell pr-2 py-2'>Name</div>
            <div className='table-cell pr-2'>Commander Name</div>
            <div className='table-cell pr-2'>Theme</div>
            <div className='table-cell pr-2'>Tribe</div>
            <div className='table-cell'>Companion</div>
          </div>
        </div>

        <div className='table-row-group'>
          {Object.entries(players).map(([key, player]) => (
            <div key={key} className='table-row'>
              {Object.entries(player).map(([key2, value]) => (
                <div key={key2} className='table-cell pr-2 pt-2 last:pr-0'>
                  <TextInput
                    value={value}
                    placeholder={key2[0].toLocaleUpperCase() + key2.slice(1)}
                    onChange={e =>
                      dispatch({
                        type: 'UPDATE_VALUE',
                        key: key2,
                        player: key,
                        value: e.target.value
                      })
                    }
                    className='w-full text-sm'
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Button onClick={() => dispatch({ type: 'ADD_PLAYER' })} className='mt-4'>
        Add Player
      </Button>

      <div className='flex items-center mt-8'>
        <div className='text-white text-base mr-4'>Winner:</div>

        <Select
          options={[
            'No Winner',
            ...Object.values(players).map(player => player.name)
          ]}
          value={winner}
          onChange={val =>
            dispatch({ type: 'SET_WINNER', winner: val as string })
          }
        />
      </div>

      <Button
        disabled={!passValid}
        onClick={async () => {
          const now = new Date()
          const month = now.getMonth() + 1
          const day = now.getDate()

          const gameWinner = winner === 'No Winner' ? undefined : winner

          const game: Game = {
            month,
            day,
            players: getPlayerObj(players),
            winner: gameWinner
          }

          await axios.post(RECORD_URI, { season, game })
          dispatch({ type: 'RESET' })
        }}
        className='mt-4'
      >
        Submit
      </Button>
    </Container>
  )
}

export default Page
