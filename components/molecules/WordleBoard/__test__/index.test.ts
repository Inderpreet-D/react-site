import '@testing-library/jest-dom'

import { getCellColors } from '..'
import { State } from '../../../../providers/WordleStateProvider/reducer'

let state: State

beforeEach(() => {
  state = {
    word: 'tests',
    wordLength: 5,
    round: 0,
    maxRound: 6,
    guesses: [],
    started: true,
    done: false,
    won: false
  }
})

it('Does something', () => {
  console.log('Here')
})
