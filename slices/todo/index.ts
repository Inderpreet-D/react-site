import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { RootState } from '../../store'
import { TodoItem } from '../../shared/todo'

import { ID_KEY } from '../../shared/constants'
import { todo } from '../../lib/api'

type TimerType = NodeJS.Timeout | null

type TodoState = {
  loaded: boolean
  loading: boolean
  saving: boolean
  saveTimer: TimerType
  items: TodoItem[]
}

const initialState: TodoState = {
  loaded: false,
  loading: false,
  saveTimer: null,
  saving: false,
  items: []
}

export const loadTodos = createAsyncThunk(
  'todo/load',
  async (_, { dispatch }) => {
    try {
      dispatch(startLoad())

      const id = localStorage.getItem(ID_KEY)!
      const items = await todo({ id })

      dispatch(endLoad(items.data))
    } catch (err) {
      console.error('Error loading', err)
    }
  }
)

export const saveTodos = createAsyncThunk(
  'todo/save',
  async (_, { dispatch, getState }) => {
    const timer = setTimeout(async () => {
      try {
        dispatch(startSave())

        const id = localStorage.getItem(ID_KEY)!
        const { items } = (getState() as RootState).todo
        await todo({ id, items })

        dispatch(endSave())
      } catch (err) {
        console.error('Error saving', err)
      }
    }, 1500)

    dispatch(beginSave(timer))
  }
)

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ text: string; parent: string | null }>
    ) => {
      const { text, parent } = action.payload

      const newItem: TodoItem = {
        id: uuidv4(),
        parent,
        text,
        checked: false
      }

      state.items.push(newItem)
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload

      const idx = state.items.findIndex(item => item.id === id)

      state.items.splice(idx, 1)
    },

    setParent: (
      state,
      action: PayloadAction<{ id: string; parent: string | null }>
    ) => {
      const { id, parent } = action.payload

      const item = state.items.find(item => item.id === id)

      if (item) {
        item.parent = parent
      }
    },

    setText: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload

      const item = state.items.find(item => item.id === id)

      if (item) {
        item.text = text
      }
    },

    setChecked: (
      state,
      action: PayloadAction<{ id: string; checked: boolean }>
    ) => {
      const { id, checked } = action.payload

      const item = state.items.find(item => item.id === id)

      if (item) {
        item.checked = checked
      }
    },

    startLoad: state => {
      state.loading = true
    },

    endLoad: (state, action: PayloadAction<TodoItem[]>) => {
      state.loading = false
      state.loaded = true
      state.items = action.payload
    },

    beginSave: (state, action: PayloadAction<TimerType>) => {
      if (state.saveTimer) {
        clearTimeout(state.saveTimer)
      }

      state.saveTimer = action.payload
      state.saving = false
    },

    startSave: state => {
      state.saving = true
    },

    endSave: state => {
      state.saving = false

      if (state.saveTimer) {
        clearTimeout(state.saveTimer)
      }
      state.saveTimer = null
    }
  }
})

export const {
  addItem,
  removeItem,
  setParent,
  setText,
  setChecked
} = todoSlice.actions
const { startLoad, endLoad, beginSave, startSave, endSave } = todoSlice.actions

export const selectTodo = (state: RootState) => state.todo

export default todoSlice.reducer
