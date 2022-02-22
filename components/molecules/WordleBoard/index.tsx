import {
  Container,
  Row,
  EmptyCell,
  NormalCell,
  CorrectCell,
  WrongPlaceCell,
  Input
} from './styles'

import { State } from '../../../providers/WordleStateProvider/reducer'
import { useWordleState } from '../../../providers/WordleStateProvider'
import { ChangeEvent, KeyboardEvent } from 'react'

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

const WordleBoard: React.FC<WordleBoardProps> = ({ reset }) => {
  const { state, makeGuess } = useWordleState()

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
  const [currentWord, setCurrentWord] = React.useState<string[]>(
    new Array(state.wordLength).fill('')
  )
  const [goNext, setGoNext] = React.useState(-1)

  const nextGuess = React.useCallback(() => {
    const first = inputRefs.current[0]
    if (first) {
      first.focus()
    }
    setCurrentWord(new Array(state.wordLength).fill(''))
  }, [state.wordLength])

  React.useEffect(() => {
    nextGuess()
    inputRefs.current = []
  }, [nextGuess])

  React.useEffect(() => {
    if (goNext >= 0) {
      setGoNext(-1)
      const nextInput = inputRefs.current[goNext + 1]
      if (nextInput) {
        nextInput.focus()
      }
    }
  }, [goNext])

  const handleChange = React.useCallback(
    (cellIdx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentWord(old => {
        const copy = [...old]
        copy[cellIdx] = e.target.value
        return copy
      })
    },
    []
  )

  const handleKeyDown = React.useCallback(
    (cellIdx: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      const key = e.key

      if (key === 'Enter') {
        const word = currentWord.join('')
        const guess = word.trim().toLocaleLowerCase()

        const lengthMatch = guess.length === state.wordLength
        const alreadyGuessed = state.guesses.includes(guess)

        if (lengthMatch && !alreadyGuessed) {
          makeGuess(guess)
          nextGuess()
        }

        return
      }

      if (key === 'Backspace') {
        if (currentWord[cellIdx] === '') {
          const prev = inputRefs.current[cellIdx - 1]
          if (prev) {
            prev.focus()
          }
        }

        return
      }

      setGoNext(cellIdx)
    },
    [currentWord, state.wordLength, state.guesses, makeGuess, nextGuess]
  )

  return (
    <Container>
      <div>{state.started ? `Word is ${state.word}` : 'Loading...'}</div>

      {new Array(state.maxRound).fill(0).map((_, rowIdx) => (
        <Row key={rowIdx}>
          {new Array(state.wordLength).fill(0).map((_, cellIdx) => {
            const key = `${rowIdx}-${cellIdx}`

            if (rowIdx === state.round) {
              return (
                <EmptyCell key={key}>
                  <Input
                    ref={val => {
                      inputRefs.current[cellIdx] = val
                    }}
                    value={(currentWord[cellIdx] ?? '').toLocaleUpperCase()}
                    onChange={handleChange(cellIdx)}
                    onKeyDown={handleKeyDown(cellIdx)}
                    autoFocus={cellIdx === 0}
                    maxLength={1}
                    disabled={state.done}
                  />
                </EmptyCell>
              )
            }

            return getCell(state, rowIdx, cellIdx, key)
          })}
        </Row>
      ))}

      {state.done && (
        <div>
          Game over: {state.won ? 'You won' : `the word was '${state.word}'`}
        </div>
      )}

      {state.done && <div onClick={reset}>RESTART</div>}
    </Container>
  )
}

export default WordleBoard
