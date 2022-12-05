import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RoomState } from '../../components/pages/Treachery/Room'
import { CardResponse } from '../../pages/api/treachery/types'
import { AppDispatch, RootState } from '../../store'

enum State {
  Main,
  Room,
  Card,
  Load
}

type TreacheryState = {
  state: State
  roomState: RoomState
  cardState: CardResponse
  error: string | null
  canRejoin: boolean
  isJoining: boolean
  values: Values
}

type Values = {
  code: string
  rarity: string
  players: number
}

export const rarityOptions = ['Uncommon', 'Rare', 'Mythic']
export const playerOptions = [4, 5, 6, 7, 8]

const ID_KEY = 'inderpreetd.treachery.id'
const ROOM_KEY = 'inderpreetd.treachery.room'

const initialState: TreacheryState = {
  state: State.Main,
  roomState: {
    roomCode: '',
    numPlayers: 0,
    roomSize: -1
  },
  cardState: {} as CardResponse,
  error: null,
  canRejoin: false,
  isJoining: false,
  values: {
    code: '',
    rarity: rarityOptions[0],
    players: playerOptions[0]
  }
}

const treacherySlice = createSlice({
  name: 'treachery',
  initialState,
  reducers: {
    setup: (state: TreacheryState) => {
      state.canRejoin = window.sessionStorage.getItem(ID_KEY) !== null
    }
  }
})

export const { setup } = treacherySlice.actions
const {} = treacherySlice.actions

export const selectTreachery = (state: RootState) => state.treachery

export default treacherySlice.reducer
