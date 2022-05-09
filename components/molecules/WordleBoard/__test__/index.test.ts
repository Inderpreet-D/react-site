import '@testing-library/jest-dom'

import { WordleState } from '../../../../slices/wordle'
import { Result, getCellColors } from '../utils'

let state: WordleState

beforeEach(() => {
  state = {
    currentGuess: '',
    word: '',
    wordLength: 0,
    round: 0,
    maxRound: 6,
    guesses: [],
    started: true,
    done: false,
    won: false
  }
})

it('Checks positions', () => {
  state = { ...state, word: 'sat', wordLength: 3, guesses: ['ass'] }
  expect(getCellColors(state, 0)).toStrictEqual([
    Result.WrongPlace,
    Result.WrongPlace,
    Result.Incorrect
  ])
})

it('Passes on correct', () => {
  state = { ...state, word: 'testing', wordLength: 7, guesses: ['testing'] }
  expect(getCellColors(state, 0)).toStrictEqual([
    Result.Correct,
    Result.Correct,
    Result.Correct,
    Result.Correct,
    Result.Correct,
    Result.Correct,
    Result.Correct
  ])
})

it('Passes on correct with previous', () => {
  state = {
    ...state,
    word: 'testing',
    wordLength: 7,
    guesses: ['failure', 'testing']
  }
  expect(getCellColors(state, 1)).toStrictEqual([
    Result.Correct,
    Result.Correct,
    Result.Correct,
    Result.Correct,
    Result.Correct,
    Result.Correct,
    Result.Correct
  ])
})

it('Handles multiple passes', () => {
  state = { ...state, word: 'ketch', wordLength: 5, guesses: ['catch'] }
  expect(getCellColors(state, 0)).toStrictEqual([
    Result.Incorrect,
    Result.Incorrect,
    Result.Correct,
    Result.Correct,
    Result.Correct
  ])
})
