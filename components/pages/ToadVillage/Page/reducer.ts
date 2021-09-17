import mtgDownload, {
  randomName
} from '../../../../utilities/helpers/toadvillage'

import { DownloadInput } from '../../../../utilities/helpers/toadvillage/types'

type State = {
  cardList: { amount: number; name: string }[]
  cardListString: string
  cardObjs: { [x: string]: any[] }
  name: string
  error: string
  loading: boolean
}

type Action = {
  type: string
  [x: string]: any
}

type ReducerFunc = (state: State, action: Action) => State

export const toadVillageReducer: ReducerFunc = (state, action) => {
  const { type } = action

  if (type in Handlers) {
    return Handlers[type](state, action)
  }

  throw new Error(`Unknown toadVillage reducer type: ${type}`)
}

const handleDeckResponse: ReducerFunc = (state, action) => {
  const { data } = action
  const { unmatched, ...cardData } = data

  let error = ''
  if (unmatched.length) {
    const cardNames = unmatched.join(', ')
    const suffix = unmatched.length === 1 ? '' : 's'
    error = `Could not find the following card${suffix}: ${cardNames}`
  }

  return { ...state, cardObjs: cardData, loading: false, error }
}

const handleResetCardObjs: ReducerFunc = (state, _) => {
  return { ...state, cardObjs: {} }
}

const handleStartFetch: ReducerFunc = (state, _) => {
  return { ...state, loading: true, error: '' }
}

const handleDownload: ReducerFunc = (state, _) => {
  const objs = (state.cardObjs as unknown) as DownloadInput
  const error = mtgDownload(objs, state.name) ?? ''

  if (error) {
    return { ...state, error }
  } else {
    return state
  }
}

const handleCancel: ReducerFunc = (state, _) => {
  return { ...state, cardList: [], cardListString: '' }
}

const handleSetCardString: ReducerFunc = (state, action) => {
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

const handleMove: ReducerFunc = (state, action) => {
  const { cardObj, isCommander } = action

  let others = state.cardObjs.others.filter(card => card !== cardObj)
  let commanders = [...state.cardObjs.commanders, cardObj]
  if (isCommander) {
    commanders = state.cardObjs.commanders.filter(card => card !== cardObj)
    others = [...state.cardObjs.others, cardObj]
  }

  return { ...state, cardObjs: { ...state.cardObjs, commanders, others } }
}

const handleChangeCount: ReducerFunc = (state, action) => {
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

const handleClearError: ReducerFunc = (state, _) => {
  return { ...state, error: '' }
}

const handleSetError: ReducerFunc = (state, action) => {
  const { error } = action

  return { ...state, error }
}

const handleSetName: ReducerFunc = (state, action) => {
  const { name } = action

  return { ...state, name }
}

export const initialState: State = {
  cardList: [],
  cardListString: '',
  cardObjs: {},
  name: randomName(),
  error: '',
  loading: false
}

export const Actions = {
  DECK_RESPONSE: 'DECK_RESPONSE',
  RESET_CARD_OBJS: 'RESET_CARD_OBJS',
  START_FETCH: 'START_FETCH',
  DOWNLOAD: 'DOWNLOAD',
  CANCEL: 'CANCEL',
  SET_CARDS_STRING: 'SET_CARDS_STRING',
  MOVE: 'MOVE',
  CHANGE_COUNT: 'CHANGE_COUNT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_ERROR: 'SET_ERROR',
  SET_NAME: 'SET_NAME'
}

const Handlers: { [x: string]: ReducerFunc } = {
  [Actions.DECK_RESPONSE]: handleDeckResponse,
  [Actions.RESET_CARD_OBJS]: handleResetCardObjs,
  [Actions.START_FETCH]: handleStartFetch,
  [Actions.DOWNLOAD]: handleDownload,
  [Actions.CANCEL]: handleCancel,
  [Actions.SET_CARDS_STRING]: handleSetCardString,
  [Actions.MOVE]: handleMove,
  [Actions.CHANGE_COUNT]: handleChangeCount,
  [Actions.CLEAR_ERROR]: handleClearError,
  [Actions.SET_ERROR]: handleSetError,
  [Actions.SET_NAME]: handleSetName
}
