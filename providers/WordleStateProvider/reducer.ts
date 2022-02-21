import { Handler, ReducerFunc } from '../../shared/reducer'

const handleStart: Func = (_state, action) => {
  const { word } = action as { word: string }

  return {
    ...initialState,
    word: word.trim().toLocaleLowerCase(),
    maxRound: word.length + 1,
    started: true
  }
}

const handleMakeGuess: Func = (state, action) => {
  const { guess } = action as { guess: string }

  const fixedGuess = guess.trim().toLocaleLowerCase()

  if (state.guesses.includes(fixedGuess)) {
    return state
  }

  const newGuesses = [...state.guesses, fixedGuess]
  const newRound = state.round + 1
  const newDone = newRound === state.maxRound
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
