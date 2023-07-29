import { WordleState } from '../../../../slices/wordle'

export enum Result {
  Unchecked = 0,
  Incorrect,
  Correct,
  WrongPlace
}

export const getCellColors = (state: WordleState, rowIdx: number) => {
  const result = new Array(state.wordLength).fill(Result.Unchecked)

  const wordLetters = state.word.split('')
  const wordCountDict: { [x: string]: number } = {}
  wordLetters.forEach(letter => {
    wordCountDict[letter] = (wordCountDict[letter] ?? 0) + 1
  })

  const guess = state.guesses[rowIdx]
  const guessLetters = guess.split('')

  // Mark incorrect
  for (let i = 0; i < state.wordLength; i++) {
    const guessLetter = guessLetters[i]

    if (!wordLetters.includes(guessLetter)) {
      result[i] = Result.Incorrect
    }
  }

  // Mark correct
  for (let i = 0; i < state.wordLength; i++) {
    if (result[i] === Result.Unchecked) {
      const guessLetter = guessLetters[i]
      const wordLetter = wordLetters[i]

      if (guessLetter === wordLetter && wordCountDict[guessLetter] > 0) {
        result[i] = Result.Correct
        wordCountDict[guessLetter]--
      }
    }
  }

  // Finds incorrect or those in wrong place
  for (let i = 0; i < state.wordLength; i++) {
    if (result[i] === Result.Unchecked) {
      const guessLetter = guessLetters[i]

      if (wordCountDict[guessLetter] === 0) {
        result[i] = Result.Incorrect
        continue
      }

      result[i] = Result.WrongPlace
      wordCountDict[guessLetter]--
    }
  }

  return result
}
