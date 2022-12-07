import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

import { AppDispatch, GetState, RootState } from '../store'

type LifeState = {
  board: boolean[][]
  width: number
  height: number
  timer: NodeJS.Timer | null
  running: boolean
}

const INITIAL = {
  width: 160,
  height: 47
}

const initialState: LifeState = {
  board: new Array(INITIAL.height)
    .fill(0)
    .map(_ => new Array(INITIAL.width).fill(false)),
  width: INITIAL.width,
  height: INITIAL.height,
  timer: null,
  running: false
}

const lifeSlice = createSlice({
  name: 'life',
  initialState,
  reducers: {
    tick: (state: LifeState) => {
      const { height, width, board } = state
      const newCells = cloneDeep(board)

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const indices = [
            [y - 1, x - 1],
            [y - 1, x],
            [y - 1, x + 1],
            [y, x - 1],
            [y, x + 1],
            [y + 1, x - 1],
            [y + 1, x],
            [y + 1, x + 1]
          ]

          let surrounding = 0
          for (let i = 0; i < indices.length; i++) {
            const [vy, vx] = indices[i]
            const val = board[vy] ? board[vy][vx] : false
            if (val) {
              surrounding++
            }
          }

          const val = board[y][x]
          newCells[y][x] =
            (val && [2, 3].includes(surrounding)) || (!val && surrounding === 3)
        }
      }

      state.board = newCells
    },

    resize: (
      state: LifeState,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      const { width, height } = action.payload
      state.width = width
      state.height = height

      const newBoard = []
      for (let y = 0; y < height; y++) {
        const row = []
        for (let x = 0; x < width; x++) {
          row.push(state.board[y] ? state.board[y][x] : false)
        }
        newBoard.push(row)
      }

      state.board = newBoard
    },

    toggle: (
      state: LifeState,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      const { x, y } = action.payload
      state.board[y][x] = !state.board[y][x]

      if (state.timer) {
        clearInterval(state.timer)
      }
      state.timer = null
      state.running = false
    },

    reset: (state: LifeState) => {
      if (state.timer) {
        clearInterval(state.timer)
      }

      return initialState
    },

    stopRunning: (state: LifeState) => {
      if (state.timer) {
        clearInterval(state.timer)
      }

      state.running = false
    },

    finishToggleRunning: (
      state: LifeState,
      action: PayloadAction<{
        timer: NodeJS.Timer | null
        running: boolean
      }>
    ) => {
      if (state.timer) {
        clearInterval(state.timer)
      }

      const { timer, running } = action.payload
      state.timer = timer
      state.running = running
    }
  }
})

export const { toggle, reset, stopRunning, tick } = lifeSlice.actions
const { resize, finishToggleRunning } = lifeSlice.actions

export const changeWidth = (width: number) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const { height } = selectLife(getState())
    dispatch(resize({ width, height }))
  }
}

export const changeHeight = (height: number) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const { width } = selectLife(getState())
    dispatch(resize({ width, height }))
  }
}

export const toggleRunning = (delay: number) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const { running, timer } = selectLife(getState())

    if (timer) {
      clearInterval(timer)
    }

    if (running) {
      dispatch(finishToggleRunning({ timer: null, running: false }))
    } else {
      const newTimer = setInterval(() => dispatch(tick()), delay)
      dispatch(finishToggleRunning({ timer: newTimer, running: true }))
    }
  }
}

export const selectLife = (state: RootState) => state.life

export default lifeSlice.reducer
