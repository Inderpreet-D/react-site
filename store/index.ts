import { ThunkAction, Action, configureStore } from '@reduxjs/toolkit'

import recipeReducer from '../slices/recipe'

export const store = configureStore({
  reducer: {
    recipe: recipeReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
