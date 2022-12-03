import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

import Cell from './Cell'
import LetterCell from './LetterCell'
import Button from '../../atoms/Button'

import { checkValidWord } from '../../../lib/api/wordle'
import {
  selectWordle,
  nextGuess as startNext,
  makeGuess,
  pressKey
} from '../../../slices/wordle'

type WordleBoardProps = {
  reset: () => void
}

const WordleBoard: React.FC<WordleBoardProps> = ({ reset }) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectWordle)

  const nextGuess = React.useCallback(() => {
    dispatch(startNext())
  }, [dispatch])

  const handleEnter = React.useCallback(async () => {
    const word = state.currentGuess
    const guess = word.trim().toLocaleLowerCase()

    const lengthMatch = guess.length === state.wordLength
    const alreadyGuessed = state.guesses.includes(guess)

    // Check that the guess is a real word
    const isValid = await checkValidWord(guess)

    if (lengthMatch && !alreadyGuessed && isValid) {
      dispatch(makeGuess(guess))
      nextGuess()
    }
  }, [state.currentGuess, state.wordLength, state.guesses, dispatch, nextGuess])

  const onKey = React.useCallback(
    (e: KeyboardEvent) => {
      const key = e.key

      if (key === 'Enter' && state.currentGuess.length === state.wordLength) {
        handleEnter()

        return
      }

      dispatch(pressKey(key))
    },
    [state.currentGuess, state.wordLength, handleEnter, dispatch]
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

            return <LetterCell key={key} rowIdx={rowIdx} cellIdx={cellIdx} />
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
                    'mr-2 last:mr-0 uppercase p-2 border border-primary-dark rounded-md w-8 flex items-center justify-center mt-4',
                    state.word.includes(char) && allGuesses.includes(char)
                      ? 'bg-success-main text-white'
                      : allGuesses.includes(char)
                      ? 'bg-dark-main text-dark-dark'
                      : 'bg-transparent text-primary-light'
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
