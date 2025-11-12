import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "../slices/alert";
import authReducer from "../slices/auth";
import lifeReducer from "../slices/life";
import mtgRecordReducer from "../slices/mtgRecord";
import recipeReducer from "../slices/recipe";
import toadVillageReducer from "../slices/toadVillage";
import treacheryReducer from "../slices/treachery";
import wordleReducer from "../slices/wordle";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,

    life: lifeReducer,

    mtgRecord: mtgRecordReducer,

    recipe: recipeReducer,

    toadVillage: toadVillageReducer,
    treachery: treacheryReducer,

    wordle: wordleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type GetState = typeof store.getState;
