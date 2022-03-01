import axios from 'axios'

import {
  Container,
  Row,
  EmptyCell,
  NormalCell,
  CorrectCell,
  WrongPlaceCell
} from './styles'

import { State } from '../../../providers/WordleStateProvider/reducer'
import { useWordleState } from '../../../providers/WordleStateProvider'

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
    return <NormalCell key={key} />
  }

  const guess = state.guesses[rowIdx]
  const letter = guess[cellIdx]
  const inWord = state.word.includes(letter)
  const correct = state.word[cellIdx] === letter
  const upper = letter.toLocaleUpperCase()

  if (correct) {
    return <CorrectCell key={key}>{upper}</CorrectCell>
  }

  if (inWord) {
    return <WrongPlaceCell key={key}>{upper}</WrongPlaceCell>
  }

  return <NormalCell key={key}>{upper}</NormalCell>
}

const isAlphaKey = (key: string) => key.length === 1 && key.match(/[a-zA-Z]/i)

const WordleBoard: React.FC<WordleBoardProps> = ({ reset }) => {
  const { state, makeGuess } = useWordleState()

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [currentWord, setCurrentWord] = React.useState<string[]>(
    new Array(state.wordLength).fill('')
  )
  const [currentIdx, setCurrentIdx] = React.useState(0)

  const nextGuess = React.useCallback(() => {
    setCurrentIdx(0)
    setCurrentWord(new Array(state.wordLength).fill(''))
  }, [state.wordLength])

  const focus = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inputRef.current) {
        return
      }

      const focused = inputRef.current === document.activeElement
      if (focused) {
        return
      }

      inputRef.current.focus()

      const key = e.key
      if (!isAlphaKey(key)) {
        setCurrentIdx(0)
        return
      }

      setCurrentIdx(1)
      setCurrentWord(old => {
        const copy = [...old]
        copy[0] = key
        return copy
      })
    }

    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const handleEnter = React.useCallback(async () => {
    const word = currentWord.join('')
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
  }, [currentWord, state.wordLength, state.guesses, makeGuess, nextGuess])

  const handleBackspace = React.useCallback(() => {
    setCurrentWord(old => {
      const copy = [...old]
      copy[currentIdx] = ''
      return copy
    })

    setCurrentIdx(old => {
      if (old === 0) {
        return 0
      }

      return old - 1
    })
  }, [currentIdx])

  const handleLetter = React.useCallback(
    (key: string) => {
      setCurrentWord(old => {
        const copy = [...old]
        copy[currentIdx] = key
        return copy
      })

      setCurrentIdx(old => {
        if (old === state.wordLength - 1) {
          return state.wordLength - 1
        }

        return old + 1
      })
    },
    [currentIdx, state.wordLength]
  )

  const handleKeyDown = React.useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key

      if (key === 'Enter' && currentIdx === state.wordLength - 1) {
        await handleEnter()
        return
      }

      if (key === 'Backspace') {
        handleBackspace()
        return
      }

      if (isAlphaKey(key)) {
        handleLetter(key)
      }
    },
    [currentIdx, state.wordLength, handleEnter, handleBackspace, handleLetter]
  )

  return (
    <Container>
      {new Array(state.maxRound).fill(0).map((_, rowIdx) => (
        <Row key={rowIdx}>
          {new Array(state.wordLength).fill(0).map((_, cellIdx) => {
            const key = `${rowIdx}-${cellIdx}`

            if (rowIdx === state.round) {
              return (
                <EmptyCell
                  key={key}
                  current={cellIdx === currentIdx}
                  onClick={() => {
                    focus()
                    setCurrentIdx(cellIdx)
                  }}
                >
                  {(currentWord[cellIdx] ?? '').toLocaleUpperCase()}
                </EmptyCell>
              )
            }

            return getCell(state, rowIdx, cellIdx, key)
          })}
        </Row>
      ))}

      {state.done && (
        <>
          <div>
            Game over: {state.won ? 'You won' : `the word was '${state.word}'`}
          </div>

          <div
            onClick={() => {
              focus()
              reset()
            }}
          >
            RESTART
          </div>
        </>
      )}

      {/* Hidden input */}
      <input
        ref={inputRef}
        value={currentWord.join('').toLocaleUpperCase()}
        onKeyDown={handleKeyDown}
        maxLength={state.wordLength}
        disabled={state.done}
        style={{
          position: 'absolute',
          zIndex: '-1'
        }}
        autoFocus
        readOnly
      />
    </Container>
  )
}

export default WordleBoard
