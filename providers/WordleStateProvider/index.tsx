import { State, reducer, initialState } from './reducer'

type ContextType = {
  state: State
  startGame: (word: string) => void
  makeGuess: (guess: string) => void
  pressKey: (key: string) => void
  nextGuess: () => void
}

type Props = {
  children: React.ReactNode
}

const WordleStateContext = React.createContext<ContextType | null>(null)

const WordleStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const startGame = React.useCallback((word: string) => {
    dispatch({ type: 'START', word })
  }, [])

  const makeGuess = React.useCallback((guess: string) => {
    dispatch({ type: 'MAKE_GUESS', guess })
  }, [])

  const pressKey = React.useCallback((key: string) => {
    dispatch({ type: 'PRESS_KEY', key })
  }, [])

  const nextGuess = React.useCallback(() => {
    dispatch({ type: 'NEXT_GUESS' })
  }, [])

  return (
    <WordleStateContext.Provider
      value={{ state, startGame, makeGuess, pressKey, nextGuess }}
    >
      {children}
    </WordleStateContext.Provider>
  )
}

export default WordleStateProvider

export const useWordleState = () =>
  React.useContext(WordleStateContext) as ContextType
