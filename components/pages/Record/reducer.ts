import { v4 as uuidv4 } from 'uuid'

import { Handler, ReducerFunc } from '../../../shared/reducer'

const handleReset: Func = (_, __) => {
  return initialState
}

const handleSetSeasonName: Func = (state, action) => {
  const { value } = action as { value: string }
  return { ...state, seasonName: value }
}

const handleStartAddingSeason: Func = (state, _) => {
  return { ...state, addingSeason: true }
}

const handleEndAddingSeason: Func = (state, _) => {
  return { ...state, addingSeason: false, seasonName: '' }
}

const handleSetSeason: Func = (state, action) => {
  const { season } = action as { season: string }
  return { ...state, season }
}

const handleSetSeasons: Func = (state, action) => {
  const { seasons } = action as { seasons: string[] }
  let season = state.season
  if (seasons.length) {
    season = seasons[seasons.length - 1]
  }
  return { ...state, seasons, season }
}

const handleUpdateValue: Func = (state, action) => {
  const { player, key, value } = action as {
    player: string
    key: string
    value: string
  }
  const newPlayers = { ...state.players }
  newPlayers[player] = { ...newPlayers[player], [key]: value }
  return { ...state, players: newPlayers }
}

const handleAddPlayer: Func = (state, _) => {
  return { ...state, players: { ...state.players, [uuidv4()]: makePlayer('') } }
}

const handleSetWinner: Func = (state, action) => {
  const { winner } = action as { winner: string }
  return { ...state, winner }
}

const handleSetPassword: Func = (state, action) => {
  const { password } = action as { password: string }
  return { ...state, password }
}

type Player = {
  name: string
  commander: string
  theme: string
  tribe: string
  companion: string
}

type Players = {
  [key: string]: Player
}

export type State = {
  addingSeason: boolean
  seasonName: string
  season: string
  seasons: string[]
  seasonsLoaded: boolean
  players: Players
  winner: string
  password: string
}

const makePlayer = (name: string): Player => ({
  name,
  commander: '',
  theme: '',
  tribe: '',
  companion: ''
})

const getDefaultPlayers = (): Players => {
  return {
    [uuidv4()]: makePlayer('Alberto'),
    [uuidv4()]: makePlayer('Gary'),
    [uuidv4()]: makePlayer('Inderpreet'),
    [uuidv4()]: makePlayer('Richard')
  }
}

type Action =
  | { type: 'RESET' }
  | { type: 'SET_SEASON_NAME'; name: string }
  | { type: 'START_ADDING_SEASON' }
  | { type: 'END_ADDING_SEASON' }
  | { type: 'SET_SEASON'; season: string }
  | { type: 'SET_SEASONS'; seasons: string[] }
  | { type: 'UPDATE_VALUE'; player: string; key: string; value: string }
  | { type: 'ADD_PLAYER' }
  | { type: 'SET_WINNER'; winner: string }
  | { type: 'SET_PASSWORD'; password: string }

type Func = ReducerFunc<State, Action>

export const initialState: State = {
  addingSeason: false,
  seasonName: '',
  season: '',
  seasons: [],
  seasonsLoaded: false,
  players: getDefaultPlayers(),
  winner: 'No Winner',
  password: ''
}

const Handlers: Handler<Func> = {
  RESET: handleReset,
  SET_SEASON_NAME: handleSetSeasonName,
  START_ADDING_SEASON: handleStartAddingSeason,
  END_ADDING_SEASON: handleEndAddingSeason,
  SET_SEASON: handleSetSeason,
  SET_SEASONS: handleSetSeasons,
  UPDATE_VALUE: handleUpdateValue,
  ADD_PLAYER: handleAddPlayer,
  SET_WINNER: handleSetWinner,
  SET_PASSWORD: handleSetPassword
}

export const reducer: Func = (state, action) => {
  const { type } = action

  if (type in Handlers) {
    return Handlers[type](state, action)
  }

  throw new Error(`Unknown record reducer type: ${type}`)
}
