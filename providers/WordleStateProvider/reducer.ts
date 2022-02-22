import { Handler, ReducerFunc } from '../../shared/reducer'

const handleStart: Func = (_state, action) => {
  const { word } = action as { word: string }

  const fixedWord = word.trim().toLocaleLowerCase()
  const wordLen = fixedWord.length

  return {
    ...initialState,
    word: fixedWord,
    wordLength: wordLen,
    maxRound: wordLen + 1,
    started: true
  }
}

const handleMakeGuess: Func = (state, action) => {
  const { guess } = action as { guess: string }

  const fixedGuess = guess.trim().toLocaleLowerCase()

  const newGuesses = [...state.guesses, fixedGuess]
  const newRound = state.round + 1
  const newDone = newRound === state.maxRound || fixedGuess === state.word
  const newWon = newGuesses.includes(state.word)

  return {
    ...state,
    guesses: newGuesses,
    round: newRound,
    done: newDone,
    won: newWon
  }
}

export type State = {
  word: string
  wordLength: number
  guesses: string[]
  round: number
  maxRound: number
  started: boolean
  done: boolean
  won: boolean
}

type Action =
  | { type: 'START'; word: string }
  | { type: 'MAKE_GUESS'; guess: string }

type Func = ReducerFunc<State, Action>

export const initialState: State = {
  word: '',
  wordLength: 0,
  guesses: [],
  round: 0,
  maxRound: 1,
  started: false,
  done: false,
  won: false
}

const Handlers: Handler<Func> = {
  START: handleStart,
  MAKE_GUESS: handleMakeGuess
}

export const reducer: Func = (state, action) => {
  const { type } = action

  if (type in Handlers) {
    return Handlers[type](state, action)
  }

  throw new Error(`Unknown wordleState reducer type: ${type}`)
}
