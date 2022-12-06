import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppDispatch, GetState, RootState } from '../../store'
import { CardResponse } from '../../pages/api/treachery/types'
import { Card, Rarity } from '../../shared/treachery'

import {
  getCard,
  waitRoom,
  joinRoom as joinRoomAPI,
  createRoom as createRoomAPI
} from '../../lib/api/treachery'

export enum State {
  Main,
  Room,
  Card,
  Load
}

type TreacheryState = {
  state: State
  roomState: {
    roomCode: string
    numPlayers: number
    roomSize: number
  }
  cardState: CardResponse
  error: string | null
  canRejoin: boolean
  isJoining: boolean
  values: {
    code: string
    rarity: string
    players: number
  }
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
    },

    updateRoomData: (
      state: TreacheryState,
      action: PayloadAction<{
        roomCode?: string
        numPlayers: number
        roomSize: number
      }>
    ) => {
      const { roomCode, numPlayers, roomSize } = action.payload

      if (roomCode) {
        state.roomState.roomCode = roomCode
      }

      state.roomState.numPlayers = numPlayers
      state.roomState.roomSize = roomSize
    },

    updateCard: (state: TreacheryState, action: PayloadAction<Card>) => {
      state.cardState = action.payload
      state.state = State.Card
    },

    startLoading: (state: TreacheryState) => {
      state.state = State.Load
      state.error = null
    },

    showError: (state: TreacheryState, action: PayloadAction<string>) => {
      state.error = action.payload
      state.state = State.Main
    },

    showRoom: (
      state: TreacheryState,
      action: PayloadAction<{ id: string; roomCode: string }>
    ) => {
      const { id, roomCode } = action.payload

      window.sessionStorage.setItem(ID_KEY, id)
      window.sessionStorage.setItem(ROOM_KEY, roomCode)

      state.state = State.Room
    },

    resetError: (state: TreacheryState) => {
      state.error = ''
    },

    setJoining: (state: TreacheryState, action: PayloadAction<boolean>) => {
      state.isJoining = action.payload
    },

    setValues: (
      state: TreacheryState,
      action: PayloadAction<{ prop: string; val: string }>
    ) => {
      const { prop, val } = action.payload

      if (!(prop in state.values)) {
        return
      }

      const key = prop as 'code' | 'rarity' | 'players'

      if (key !== 'code') {
        if (key === 'players') {
          state.values.players = +val
        } else {
          state.values.rarity = val
        }
        return
      }

      state.values.code = (val as string).toLocaleUpperCase().trim()
    }
  }
})

export const { setup, resetError, setJoining, setValues } =
  treacherySlice.actions
const { updateRoomData, updateCard, startLoading, showError, showRoom } =
  treacherySlice.actions

const loadCard = () => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const { roomState } = selectTreachery(getState())

    const id = window.sessionStorage.getItem(ID_KEY)
    if (id) {
      const res = await getCard(roomState.roomCode, id)
      dispatch(updateCard(res))
    }
  }
}

export const waitForRoom = () => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const { roomState } = selectTreachery(getState())

    const { currentPlayers, numPlayers } = await waitRoom(roomState.roomCode)

    const newRoomData = { numPlayers: currentPlayers, roomSize: numPlayers }
    dispatch(updateRoomData(newRoomData))

    if (currentPlayers === numPlayers) {
      dispatch(loadCard())
    }
  }
}

export const joinRoom = (roomCode: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading())

    const id = window.sessionStorage.getItem(ID_KEY)

    if (!id) {
      return
    }

    const data = await joinRoomAPI(roomCode, id)
    const {
      error,
      currentPlayers,
      numPlayers,
      id: roomID,
      roomCode: responseCode
    } = data

    if (error) {
      dispatch(showError(error))
      return
    }

    const newRoomData = {
      roomCode: responseCode,
      numPlayers: currentPlayers,
      roomSize: numPlayers
    }
    dispatch(updateRoomData(newRoomData))
    dispatch(showRoom({ id: roomID, roomCode: responseCode }))
  }
}

export const joinSavedRoom = () => {
  return async (dispatch: AppDispatch) => {
    const roomCode = window.sessionStorage.getItem(ROOM_KEY)
    if (roomCode) {
      dispatch(joinRoom(roomCode))
    }
  }
}

export const createRoom = (numPlayers: number, rarity: Rarity) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoading())

    const { roomCode, id } = await createRoomAPI(numPlayers, rarity)

    const newRoomData = { roomCode, roomSize: numPlayers, numPlayers: 1 }
    dispatch(updateRoomData(newRoomData))
    dispatch(showRoom({ id, roomCode }))
  }
}

export const selectTreachery = (state: RootState) => state.treachery

export default treacherySlice.reducer
