import { ThunkAction, Action, configureStore } from '@reduxjs/toolkit'

import recipeReducer from '../slices/recipe'
import lifeReducer from '../slices/life'
import wordleReducer from '../slices/wordle'
import toadVillageReducer from '../slices/toadVillage'
import todoReducer from '../slices/todo'

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    life: lifeReducer,
    wordle: wordleReducer,
    toadVillage: toadVillageReducer,
    todo: todoReducer
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
