import React from 'react'

import { State, recipeStateReducer, initialState } from './reducer'

type ContextType = {
  state: State
  reset: () => void
  check: (key: string) => void
  update: (index: number) => void
}

const RecipeStateContext = React.createContext<ContextType>(null)

const RecipeStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(recipeStateReducer, initialState)

  const reset = React.useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const check = React.useCallback((key: string) => {
    dispatch({ type: 'TOGGLE_CHECK', key })
  }, [])

  const update = React.useCallback((index: number) => {
    dispatch({ type: 'UPDATE_INDEX', index })
  }, [])

  return (
    <RecipeStateContext.Provider value={{ state, reset, check, update }}>
      {children}
    </RecipeStateContext.Provider>
  )
}

export default RecipeStateProvider

export const useRecipeState = () => React.useContext(RecipeStateContext)
