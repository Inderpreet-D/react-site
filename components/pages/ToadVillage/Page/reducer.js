import mtgDownload, {
  randomName
} from '../../../../utilities/helpers/toadvillage'

export const toadVillageReducer = (state, action) => {
  const { type } = action

  if (type in Handlers) {
    return Handlers[type](state, action)
  }

  throw new Error(`Unknown toadVillage reducer type: ${type}`)
}

const handleDeckResponse = (state, action) => {
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

const handleResetCardObjs = (state, _) => {
  return { ...state, cardObjs: {} }
}

const handleStartFetch = (state, _) => {
  return { ...state, loading: true, error: '' }
}

const handleDownload = (state, _) => {
  const error = mtgDownload(state.cardObjs, state.name) ?? ''

  return { ...state, error }
}

const handleCancel = (state, _) => {
  return { ...state, cardList: [], cardListString: '' }
}

const handleSetCardString = (state, action) => {
  const { value: cardListString } = action
  const cards = cardListString.trim().split('\n')

  const error = []
  const cardList = cards.map((card, i) => {
    const split = card.split(' ')
    const amount = +split[0]

    if (isNaN(amount)) {
      error.push([card, i + 1])
    }

    const name = split.slice(1).join(' ')
    return { amount, name }
  })

  if (error) {
    return { ...state, error, cardListString }
  }

  return { ...state, cardList, cardListString }
}

const handleMove = (state, action) => {
  const { cardObj, isCommander } = action

  let others = state.cardObjs.others.filter(card => card !== cardObj)
  let commanders = [...state.cardObjs.commanders, cardObj]
  if (isCommander) {
    commanders = state.cardObjs.commanders.filter(card => card !== cardObj)
    others = [...state.cardObjs.others, cardObj]
  }

  return { ...state, cardObjs: { ...state.cardObjs, commanders, others } }
}

const handleChangeCount = (state, action) => {
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

const handleClearError = (state, _) => {
  return { ...state, error: '' }
}

const handleSetError = (state, action) => {
  const { error } = action

  return { ...state, error }
}

const handleSetName = (state, action) => {
  const { name } = action

  return { ...state, name }
}

export const initialState = {
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

const Handlers = {
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
