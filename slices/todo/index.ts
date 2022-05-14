import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { TodoItem } from '../../shared/todo'
import { RootState } from '../../store'

type TodoState = {
  loaded: boolean
  items: TodoItem[]
}

const initialState: TodoState = {
  loaded: false,
  items: []
}

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

export const selectTodo = (state: RootState) => state.todo

export default todoSlice.reducer
