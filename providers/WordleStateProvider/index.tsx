import { State, reducer, initialState } from './reducer'

type ContextType = {
  state: State
  startGame: (word: string) => void
  makeGuess: (guess: string) => void
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

  return (
    <WordleStateContext.Provider value={{ state, startGame, makeGuess }}>
      {children}
    </WordleStateContext.Provider>
  )
}

export default WordleStateProvider

export const useWordleState = () =>
  React.useContext(WordleStateContext) as ContextType
