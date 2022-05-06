import { ThunkAction, Action, configureStore } from '@reduxjs/toolkit'

import recipeReducer from '../slices/recipe'
import lifeReducer from '../slices/life'

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    life: lifeReducer
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
