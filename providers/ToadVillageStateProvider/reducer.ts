import { Handler, ReducerFunc } from '../../shared/reducer'
import { DownloadInput } from '../../utilities/helpers/toadvillage/types'
import { TreacheryResponse } from '../../shared/toadvillage'

import mtgDownload, { randomName } from '../../utilities/helpers/toadvillage'

const handleDeckResponse: Func = (state, action) => {
  if (action.type !== 'DECK_RESPONSE') return state
  const { data } = action
  const { unmatched } = data

  let error = ''
  if (unmatched.length) {
    const cardNames = unmatched.join(', ')
    const suffix = unmatched.length === 1 ? '' : 's'
    error = `Could not find the following card${suffix}: ${cardNames}`
  }

  return { ...state, cardObjs: data, loading: false, error }
}

const handleResetCardObjs: Func = (state, _) => {
  return { ...state, cardObjs: {} as TreacheryResponse }
}

const handleStartFetch: Func = (state, _) => {
  return { ...state, loading: true, error: '' }
}

const handleDownload: Func = (state, _) => {
  const objs = (state.cardObjs as unknown) as DownloadInput
  const error = mtgDownload(objs, state.name) ?? ''

  if (error) {
    return { ...state, error }
  } else {
    return state
  }
}

const handleCancel: Func = (state, _) => {
  return { ...state, cardList: [], cardListString: '' }
}

const handleSetCardString: Func = (state, action) => {
  if (action.type !== 'SET_CARDS_STRING') return state
  const { value: cardListString } = action
  const cards = cardListString.trim().split('\n')

  let error = ''
  const cardList = cards.map((card, i) => {
    const split = card.split(' ')
    const amount = +split[0]

    if (isNaN(amount)) {
      error = `Invalid entry '${card}' on line ${i + 1}`
    }

    const name = split.slice(1).join(' ')
    return { amount, name }
  })

  if (error) {
    return { ...state, error, cardListString, cardList: [] }
  }

  return { ...state, error: '', cardList, cardListString }
}

const handleMove: Func = (state, action) => {
  if (action.type !== 'MOVE') return state
  const { cardObj, isCommander } = action

  let others = state.cardObjs.others.filter(card => card !== cardObj)
  let commanders = [...state.cardObjs.commanders, cardObj]
  if (isCommander) {
    commanders = state.cardObjs.commanders.filter(card => card !== cardObj)
    others = [...state.cardObjs.others, cardObj]
  }

  return { ...state, cardObjs: { ...state.cardObjs, commanders, others } }
}

const handleChangeCount: Func = (state, action) => {
  if (action.type !== 'CHANGE_COUNT') return state
  const { cardObj, isCommander, increment } = action

  const list = isCommander ? state.cardObjs.commanders : state.cardObjs.others
  const filtered = list.filter(card => card !== cardObj)

  const newList = [
    ...filtered,
    { ...cardObj, amount: cardObj.amount + (increment ? 1 : -1) }
  ]

  if (isCommander) {
    return { ...state, cardObjs: { ...state.cardObjs, commanders: newList } }
  }

  return { ...state, cardObjs: { ...state.cardObjs, others: newList } }
}

const handleClearError: Func = (state, _) => {
  return { ...state, error: '' }
}

const handleSetError: Func = (state, action) => {
  if (action.type !== 'SET_ERROR') return state
  const { error } = action

  return { ...state, error }
}

const handleSetName: Func = (state, action) => {
  if (action.type !== 'SET_NAME') return state
  const { name } = action

  return { ...state, name }
}

export type State = {
  cardList: { amount: number; name: string }[]
  cardListString: string
  cardObjs: TreacheryResponse
  name: string
  error: string
  loading: boolean
}

type Action =
  | { type: 'DECK_RESPONSE'; data: TreacheryResponse }
  | { type: 'RESET_CARD_OBJS' }
  | { type: 'START_FETCH' }
  | { type: 'DOWNLOAD' }
  | { type: 'CANCEL' }
  | { type: 'SET_CARDS_STRING'; value: string }
  | { type: 'MOVE'; cardObj: any; isCommander: boolean }
  | {
      type: 'CHANGE_COUNT'
      cardObj: any
      isCommander: boolean
      increment: boolean
    }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'SET_NAME'; name: string }

type Func = ReducerFunc<State, Action>

export const initialState: State = {
  cardList: [],
  cardListString: '',
  cardObjs: {} as TreacheryResponse,
  name: randomName(),
  error: '',
  loading: false
}

const Handlers: Handler<Func> = {
  DECK_RESPONSE: handleDeckResponse,
  RESET_CARD_OBJS: handleResetCardObjs,
  START_FETCH: handleStartFetch,
  DOWNLOAD: handleDownload,
  CANCEL: handleCancel,
  SET_CARDS_STRING: handleSetCardString,
  MOVE: handleMove,
  CHANGE_COUNT: handleChangeCount,
  CLEAR_ERROR: handleClearError,
  SET_ERROR: handleSetError,
  SET_NAME: handleSetName
}

export const toadVillageReducer: Func = (state, action) => {
  const { type } = action

  if (type in Handlers) {
    return Handlers[type](state, action)
  }

  throw new Error(`Unknown toadVillage reducer type: ${type}`)
}
