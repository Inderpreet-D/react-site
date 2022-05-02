import axios from 'axios'
import clsx from 'clsx'

import Cell from './Cell'
import Button from '../../atoms/Button'

import { State } from '../../../providers/WordleStateProvider/reducer'
import { useWordleState } from '../../../providers/WordleStateProvider'
import { getCellColors, Result } from './utils'

type WordleBoardProps = {
  reset: () => void
}

const getCell = (
  state: State,
  rowIdx: number,
  cellIdx: number,
  key: string
) => {
  if (rowIdx > state.round) {
    return <Cell key={key} className='bg-slate-700' />
  }

  // Determine cell color
  const result = getCellColors(state, rowIdx)
  const cellResult = result[cellIdx]

  // Get lett for this cell
  const guess = state.guesses[rowIdx]
  const letter = guess[cellIdx].toLocaleUpperCase()

  // Unchecked cell (should never happen)
  if (cellResult === Result.Unchecked) {
    return (
      <Cell key={key} className='bg-sky-400'>
        {letter}
      </Cell>
    )
  }

  // Incorrect cell
  if (cellResult === Result.Incorrect) {
    return (
      <Cell key={key} className='bg-slate-700'>
        {letter}
      </Cell>
    )
  }

  // Correct cell
  if (cellResult === Result.Correct) {
    return (
      <Cell key={key} className='bg-green-600'>
        {letter}
      </Cell>
    )
  }

  // Wrong place cell
  return (
    <Cell key={key} className='bg-yellow-600'>
      {letter}
    </Cell>
  )
}

const WordleBoard: React.FC<WordleBoardProps> = ({ reset }) => {
  const { state, makeGuess, pressKey, nextGuess: startNext } = useWordleState()

  const nextGuess = React.useCallback(() => {
    startNext()
  }, [startNext])

  const handleEnter = React.useCallback(async () => {
    const word = state.currentGuess
    const guess = word.trim().toLocaleLowerCase()

    const lengthMatch = guess.length === state.wordLength
    const alreadyGuessed = state.guesses.includes(guess)

    // Check that the guess is a real word
    const val = (await axios.get(`/api/words/valid/${guess}`)) as {
      data: { valid: boolean }
    }
    const isValid = val.data.valid

    if (lengthMatch && !alreadyGuessed && isValid) {
      makeGuess(guess)
      nextGuess()
    }
  }, [
    state.currentGuess,
    state.wordLength,
    state.guesses,
    makeGuess,
    nextGuess
  ])

  const onKey = React.useCallback(
    (e: KeyboardEvent) => {
      const key = e.key

      if (key === 'Enter' && state.currentGuess.length === state.wordLength) {
        handleEnter()

        return
      }

      pressKey(key)
    },
    [state.currentGuess, state.wordLength, handleEnter, pressKey]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
    }
  }, [onKey])

  return (
    <div className='flex items-center justify-center flex-col w-full overflow-auto'>
      {new Array(state.maxRound).fill(0).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className='mb-2 last:mb-0 flex items-center justify-center w-full overflow-auto'
        >
          {new Array(state.wordLength).fill(0).map((_, cellIdx) => {
            const key = `${rowIdx}-${cellIdx}`

            if (rowIdx === state.round) {
              return (
                <Cell key={key}>
                  {(state.currentGuess[cellIdx] ?? '').toLocaleUpperCase()}
                </Cell>
              )
            }

            return getCell(state, rowIdx, cellIdx, key)
          })}
        </div>
      ))}

      {state.done && (
        <>
          <div className='mt-4 mb-6 mx-0 text-2xl'>
            Game over:{' '}
            {state.won
              ? 'You won'
              : `the word was ${state.word.toLocaleUpperCase()}`}
          </div>

          <Button
            onClick={() => {
              reset()
            }}
          >
            NEW GAME
          </Button>
        </>
      )}

      {!state.done && (
        <>
          <div>Unused Letters</div>

          <div className='flex w-full flex-wrap justify-center'>
            {new Array(26).fill(0).map((_, i) => {
              const allGuesses = state.guesses.flat().join('')
              const char = String.fromCharCode(i + 97)

              return (
                <div
                  key={i}
                  className={clsx(
                    'mr-2 last:mr-0 uppercase p-2 border border-sky-800 rounded-md w-8 flex items-center justify-center mt-4',
                    state.word.includes(char) && allGuesses.includes(char)
                      ? 'bg-green-600 text-white'
                      : allGuesses.includes(char)
                      ? 'bg-slate-600 text-slate-800'
                      : 'bg-transparent text-sky-400'
                  )}
                >
                  {char}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default WordleBoard
