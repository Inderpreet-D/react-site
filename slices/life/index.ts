import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../../store'

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

export const changeWidth = createAsyncThunk(
  'life/changeWidth',
  async (width: number, { dispatch, getState }) => {
    const { height } = (getState() as RootState).life
    dispatch(resize({ width, height }))
  }
)

export const changeHeight = createAsyncThunk(
  'life/changeHeight',
  async (height: number, { dispatch, getState }) => {
    const { width } = (getState() as RootState).life
    dispatch(resize({ width, height }))
  }
)

export const toggleRunning = createAsyncThunk(
  'life/toggleRunning',
  async (delay: number, { dispatch, getState }) => {
    const { running, timer } = (getState() as RootState).life

    if (timer) {
      clearInterval(timer)
    }

    if (running) {
      return { timer: null, running: false }
    }

    const newTimer = setInterval(() => dispatch(tick()), delay)

    return { timer: newTimer, running: true }
  }
)

const lifeSlice = createSlice({
  name: 'life',
  initialState,
  reducers: {
    tick: state => {
      const { height, width, board } = state
      const newCells: boolean[][] = []

      for (let y = 0; y < height; y++) {
        newCells.push(new Array(width).fill(false))

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
          const surrounding = indices
            .map(([y, x]) => (board[y] ? board[y][x] : false))
            .filter(Boolean).length

          const val = board[y][x]
          let newVal: boolean
          if (val && [2, 3].includes(surrounding)) {
            newVal = true
          } else if (!val && surrounding === 3) {
            newVal = true
          } else {
            newVal = false
          }

          newCells[y][x] = newVal
        }
      }

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          state.board[y][x] = newCells[y][x]
        }
      }
    },

    resize: (
      state,
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

    toggle: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload
      state.board[y][x] = !state.board[y][x]

      if (state.timer) {
        clearInterval(state.timer)
      }
      state.timer = null
      state.running = false
    },

    reset: state => {
      if (state.timer) {
        clearInterval(state.timer)
      }

      return initialState
    },

    stopRunning: state => {
      if (state.timer) {
        clearInterval(state.timer)
      }

      state.running = false
    }
  },

  extraReducers: builder => {
    builder.addCase(
      toggleRunning.fulfilled,
      (
        state,
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
    )
  }
})

export const { toggle, reset, stopRunning, tick } = lifeSlice.actions
const { resize } = lifeSlice.actions

export const selectLife = (state: RootState) => state.life

export default lifeSlice.reducer
