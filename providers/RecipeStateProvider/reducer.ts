import { Handler, ReducerFunc } from '../../shared/reducer'

const handleReset: Func = (_, __) => {
  return initialState
}

const handleToggleCheck: Func = (state, action) => {
  const { key } = action as { key: string }

  let newChecked: string[] = []
  if (state.checked.includes(key)) {
    newChecked = state.checked.filter(k => k !== key)
  } else {
    newChecked = [...new Set([...state.checked, key])]
  }

  return { ...state, checked: newChecked }
}

const handleUpdateIndex: Func = (state, action) => {
  const { index } = action as { index: number }

  return { ...state, index }
}

export type State = {
  index: number
  checked: string[]
}

type Action =
  | { type: 'RESET' }
  | { type: 'TOGGLE_CHECK'; key: string }
  | { type: 'UPDATE_INDEX'; index: number }

type Func = ReducerFunc<State, Action>

export const initialState: State = {
  index: 0,
  checked: []
}

const Handlers: Handler<Func> = {
  RESET: handleReset,
  TOGGLE_CHECK: handleToggleCheck,
  UPDATE_INDEX: handleUpdateIndex
}

export const recipeStateReducer: Func = (state, action) => {
  const { type } = action

  if (type in Handlers) {
    return Handlers[type](state, action)
  }

  throw new Error(`Unknown recipeState reducer type: ${type}`)
}
