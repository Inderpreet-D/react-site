import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import Button from '../../atoms/Button'
import Select from '../../atoms/Select'
import TextInput from '../../atoms/TextInput'

import { reducer, initialState } from './reducer'

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

  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle>Add Competitive Record</ContainerTitle>

      <div className='flex items-center'>
        <div className='text-base text-white mr-2'>Season:</div>

        <Select
          options={['TEST 1', 'TEST 2']}
          value={season}
          onChange={val =>
            dispatch({ type: 'SET_SEASON', season: val as string })
          }
          className='mr-4'
        />

        {!addingSeason ? (
          <Button onClick={() => dispatch({ type: 'START_ADDING_SEASON' })}>
            Add Season
          </Button>
        ) : (
          <TextInput
            autoFocus
            placeholder='Season Name'
            onKeyDown={e => {
              if (e.key === 'Enter') {
                console.log({ seasonName })

                dispatch({ type: 'END_ADDING_SEASON' })
              }
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

      <TextInput
        placeholder='Password'
        value={password}
        onChange={e =>
          dispatch({ type: 'SET_PASSWORD', password: e.target.value })
        }
        className='mt-4'
        type='password'
      />

      <Button disabled={password !== 'Pass'} className='mt-4'>
        Submit
      </Button>
    </Container>
  )
}

export default Page
