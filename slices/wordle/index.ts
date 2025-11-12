import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getRandomWord } from "../../lib/api/wordle";

import { AppDispatch, RootState } from "../../store";

export type WordleState = {
  currentGuess: string;
  word: string;
  wordLength: number;
  guesses: string[];
  round: number;
  maxRound: number;
  started: boolean;
  done: boolean;
  won: boolean;
};

const initialState: WordleState = {
  currentGuess: "",
  word: "",
  wordLength: 0,
  guesses: [],
  round: 0,
  maxRound: 1,
  started: false,
  done: false,
  won: false,
};

const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    start: (_, action: PayloadAction<string>) => {
      const word = action.payload;

      const fixedWord = word.trim().toLocaleLowerCase();
      const wordLen = fixedWord.length;

      return {
        ...initialState,
        word: fixedWord,
        wordLength: wordLen,
        maxRound: wordLen + 1,
        started: true,
      };
    },

    makeGuess: (state: WordleState, action: PayloadAction<string>) => {
      const guess = action.payload;

      const fixedGuess = guess.trim().toLocaleLowerCase();

      const newGuesses = [...state.guesses, fixedGuess];
      const newRound = state.round + 1;
      const newDone = newRound === state.maxRound || fixedGuess === state.word;
      const newWon = newGuesses.includes(state.word);

      state.guesses = newGuesses;
      state.round = newRound;
      state.done = newDone;
      state.won = newWon;
    },

    pressKey: (state: WordleState, action: PayloadAction<string>) => {
      const key = action.payload;

      if (key === "Backspace") {
        if (state.currentGuess.length === 0) {
          return;
        }

        state.currentGuess = state.currentGuess.slice(
          0,
          state.currentGuess.length - 1
        );
        return;
      }

      const isAlphaKey = key.length === 1 && key.match(/[a-zA-Z]/i);

      if (isAlphaKey) {
        if (state.currentGuess.length === state.wordLength) {
          return;
        }

        state.currentGuess = `${state.currentGuess}${key}`;
      }
    },

    nextGuess: (state: WordleState) => {
      state.currentGuess = "";
    },
  },
});

export const { makeGuess, pressKey, nextGuess } = wordleSlice.actions;
const { start } = wordleSlice.actions;

export const restart = (length: number) => {
  return async (dispatch: AppDispatch) => {
    const word = await getRandomWord(length);
    dispatch(start(word));
  };
};

export const selectWordle = (state: RootState) => state.wordle;

export default wordleSlice.reducer;
