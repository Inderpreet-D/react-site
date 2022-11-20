import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'

type RecipeState = {
  index: number
  checked: string[]
}

const initialState: RecipeState = {
  index: 0,
  checked: []
}

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    reset: () => {
      return initialState
    },

    toggleCheck: (state: RecipeState, action: PayloadAction<string>) => {
      const key = action.payload

      const idx = state.checked.indexOf(key)
      if (idx >= 0) {
        state.checked.splice(idx, 1)
      } else {
        state.checked.push(key)
      }
    },

    updateIndex: (state: RecipeState, action: PayloadAction<number>) => {
      state.index = action.payload
    }
  }
})

export const { reset, toggleCheck, updateIndex } = recipeSlice.actions

export const selectRecipe = (state: RootState) => state.recipe

export default recipeSlice.reducer
