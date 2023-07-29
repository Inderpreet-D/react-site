import { v4 as uuidv4 } from 'uuid'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Players, Player, getDefaultPlayers, makePlayer } from './helpers'
import { RootState } from '../../store'

type MTGRecordState = {
  addingSeason: boolean
  seasonName: string
  season: string
  seasons: string[]
  seasonsLoaded: boolean
  players: Players
  winner: string
}

const initialState: MTGRecordState = {
  addingSeason: false,
  seasonName: '',
  season: '',
  seasons: [],
  seasonsLoaded: false,
  players: getDefaultPlayers(),
  winner: 'No Winner'
}

const mtgRecordSlice = createSlice({
  name: 'mtgRecord',
  initialState,
  reducers: {
    reset: () => {
      return initialState
    },

    setSeasonName: (state: MTGRecordState, action: PayloadAction<string>) => {
      state.seasonName = action.payload
    },

    startAddingSeason: (state: MTGRecordState) => {
      state.addingSeason = true
    },

    endAddingSeason: (state: MTGRecordState) => {
      state.addingSeason = false
      state.seasonName = ''
    },

    setSeason: (state: MTGRecordState, action: PayloadAction<string>) => {
      state.season = action.payload
    },

    setSeasons: (state: MTGRecordState, action: PayloadAction<string[]>) => {
      const seasons = action.payload
      let season = state.season
      if (seasons.length) {
        season = seasons[seasons.length - 1]
      }
      state.seasons = seasons
      state.season = season
      state.seasonsLoaded = true
    },

    updateValue: (
      state: MTGRecordState,
      action: PayloadAction<{
        player: string
        key: string
        value: string
      }>
    ) => {
      const { player, key, value } = action.payload
      state.players[player][key as keyof Player] = value
    },

    addPlayer: (state: MTGRecordState) => {
      state.players[uuidv4()] = makePlayer()
    },

    setWinner: (state: MTGRecordState, action: PayloadAction<string>) => {
      state.winner = action.payload
    }
  }
})

export const {
  reset,
  setSeasonName,
  startAddingSeason,
  endAddingSeason,
  setSeason,
  setSeasons,
  updateValue,
  addPlayer,
  setWinner
} = mtgRecordSlice.actions

export const selectMTGRecord = (state: RootState) => state.mtgRecord

export default mtgRecordSlice.reducer
