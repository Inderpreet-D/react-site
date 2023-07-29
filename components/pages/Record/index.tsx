import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

import { Game } from '../Competitive'

import Container from '../../atoms/Container'
import ContainerBackButton from '../../atoms/ContainerBackButton'
import ContainerTitle from '../../atoms/ContainerTitle'
import Button from '../../atoms/Button'
import Select from '../../atoms/Select'
import TextInput from '../../atoms/TextInput'

import { getPlayerObj } from './helpers'
import { postRecord, postSeason } from '../../../lib/api/competitive'
import {
  selectMTGRecord,
  reset,
  setSeasonName,
  startAddingSeason,
  endAddingSeason,
  setSeason,
  setSeasons,
  updateValue,
  addPlayer,
  setWinner,
  setPassword
} from '../../../slices/mtgRecord'
import useRecordPassword from './hooks/useRecordPassword'
import useRecordSeasons from './hooks/useRecordSeasons'

const Page = () => {
  const dispatch = useAppDispatch()

  const {
    addingSeason,
    seasonName,
    season,
    seasons,
    players,
    winner,
    password
  } = useAppSelector(selectMTGRecord)

  const passValid = useRecordPassword(password)
  useRecordSeasons()

  return (
    <Container>
      <ContainerBackButton to='mtg' />

      <ContainerTitle>Add Competitive Record</ContainerTitle>

      <TextInput
        placeholder='Password'
        value={password}
        onChange={e => dispatch(setPassword(e.target.value))}
        className='mt-4 mb-8'
      />

      <div className='flex items-center mb-4'>
        <Select
          label='Season:'
          options={seasons}
          value={season}
          onChange={val => dispatch(setSeason(val as string))}
          className='mr-8'
        />

        {!addingSeason ? (
          <Button
            onClick={() => dispatch(startAddingSeason())}
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

              dispatch(endAddingSeason())

              const seasons = await postSeason(seasonName)
              dispatch(setSeasons(seasons))
            }}
            onBlur={() => dispatch(endAddingSeason())}
            value={seasonName}
            onChange={e => dispatch(setSeasonName(e.target.value))}
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
                      dispatch(
                        updateValue({
                          key: key2,
                          player: key,
                          value: e.target.value
                        })
                      )
                    }
                    className='w-full text-sm'
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Button onClick={() => dispatch(addPlayer())} className='mt-4'>
        Add Player
      </Button>

      <Select
        label='Winner:'
        options={[
          'No Winner',
          ...Object.values(players).map(player => player.name)
        ]}
        value={winner}
        onChange={val => dispatch(setWinner(val as string))}
        className='mt-8'
      />

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

          await postRecord(season, game)
          dispatch(reset())
        }}
        className='mt-4'
      >
        Submit
      </Button>
    </Container>
  )
}

export default Page
