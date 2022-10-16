import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../slices/auth'
import lifeReducer from '../slices/life'
import recipeReducer from '../slices/recipe'
import toadVillageReducer from '../slices/toadVillage'
import wordleReducer from '../slices/wordle'

export const store = configureStore({
  reducer: {
    auth: authReducer,

    life: lifeReducer,

    recipe: recipeReducer,

    toadVillage: toadVillageReducer,

    wordle: wordleReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type GetState = typeof store.getState
