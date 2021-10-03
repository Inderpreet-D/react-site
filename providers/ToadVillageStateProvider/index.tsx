import { State, toadVillageReducer, initialState } from './reducer'

type ContextType = {
  state: State
}

const ToadVillageStateContext = React.createContext<ContextType | null>(null)

const ToadVillageStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(toadVillageReducer, initialState)

  return (
    <ToadVillageStateContext.Provider value={{ state }}>
      {children}
    </ToadVillageStateContext.Provider>
  )
}

export default ToadVillageStateProvider

export const useToadVillageState = () =>
  React.useContext(ToadVillageStateContext) as ContextType
