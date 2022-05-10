import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import {
  FormattedCard,
  ReqCard,
  TreacheryResponse
} from '../../shared/toadvillage'
import { DownloadInput } from '../../utilities/helpers/toadvillage/types'

import mtgDownload, {
  randomName,
  parseJSON,
  downloadDecklist
} from '../../utilities/helpers/toadvillage'
import { ID_KEY } from '../../shared/constants'
import { toadvillage } from '../../lib/api'

type ToadVillageState = {
  cardList: ReqCard[]
  cardListString: string
  cardObjs: TreacheryResponse
  name: string
  error: string
  loading: boolean
  showDialog: boolean
}

type CardChange = {
  name: string
  isCommander: boolean
}

const initialState: ToadVillageState = {
  cardList: [],
  cardListString: '',
  cardObjs: {} as TreacheryResponse,
  name: randomName(),
  error: '',
  loading: false,
  showDialog: false
}

const findCard = (
  name: string,
  isCommander: boolean,
  state: ToadVillageState
) => {
  const check = ({ card }: FormattedCard) => card.name === name

  const list = isCommander ? state.cardObjs.commanders : state.cardObjs.others

  return list.find(check)
}

const countChange = createAsyncThunk(
  'toadVillage/countChange',
  async (arg: CardChange & { increment: boolean }, { dispatch, getState }) => {
    const { name, isCommander, increment } = arg
    const state = (getState() as RootState).toadVillage
    const cardObj = findCard(name, isCommander, state)!
    dispatch(changeCount({ cardObj, isCommander, increment }))
  }
)

export const addCard = createAsyncThunk(
  'toadVillage/addCard',
  async (arg: CardChange, { dispatch }) => {
    dispatch(countChange({ ...arg, increment: true }))
  }
)

export const removeCard = createAsyncThunk(
  'toadVillage/removeCard',
  async (arg: CardChange, { dispatch }) => {
    dispatch(countChange({ ...arg, increment: false }))
  }
)

export const moveCard = createAsyncThunk(
  'toadVillage/moveCard',
  async (arg: CardChange, { dispatch, getState }) => {
    const { name, isCommander } = arg
    const state = (getState() as RootState).toadVillage
    const cardObj = findCard(name, isCommander, state)!
    dispatch(move({ cardObj, isCommander }))
  }
)

export const selectFile = createAsyncThunk(
  'toadVillage/selectFile',
  (files: FileList | null, { dispatch }) => {
    dispatch(clearError())

    if (!files || files.length === 0) {
      return
    }

    const file = files[0]

    if (!file.name.endsWith('.json')) {
      return
    }

    const reader = new FileReader()

    reader.onload = e => {
      const res = e.target!.result!.toString()
      const data = JSON.parse(res)

      try {
        const list = parseJSON(data)
        downloadDecklist(list, file)
      } catch (err) {
        const error =
          'Could not extract the decklist from that file, try a different one.'
        dispatch(setError(error))
      }
    }

    reader.readAsText(file)
  }
)

export const startApiWork = createAsyncThunk(
  'toadVillage/startApiWork',
  async (_, { getState, dispatch }) => {
    const { cardList } = (getState() as RootState).toadVillage

    if (!cardList.length) {
      dispatch(resetCardObjs())
      return
    }

    dispatch(startFetch())
    dispatch(close())

    const id = localStorage.getItem(ID_KEY)!
    await toadvillage({ id, cards: cardList })

    const interval = setInterval(async () => {
      const { data } = await toadvillage({ id })
      const { status, ...rest } = data

      if (status === 'DONE') {
        clearInterval(interval)
        dispatch(deckResponse({ data: rest }))
      }
    }, 100)
  }
)

const toadVillageSlice = createSlice({
  name: 'toadVillage',
  initialState,
  reducers: {
    open: state => {
      state.showDialog = true
    },

    close: state => {
      state.showDialog = false
    },

    deckResponse: (
      state,
      action: PayloadAction<{ data: TreacheryResponse }>
    ) => {
      const { data } = action.payload
      const { unmatched } = data

      if (unmatched.length) {
        const cardNames = unmatched.join(', ')
        const suffix = unmatched.length === 1 ? '' : 's'
        state.error = `Could not find the following card${suffix}: ${cardNames}`
      }

      state.cardObjs = data
      state.loading = false
    },

    resetCardObjs: state => {
      state.cardObjs = {} as TreacheryResponse
    },

    startFetch: state => {
      state.loading = true
      state.error = ''
    },

    download: state => {
      const objs = (state.cardObjs as unknown) as DownloadInput
      const error = mtgDownload(objs, state.name) ?? ''

      if (error) {
        state.error = error
      }
    },

    cancel: state => {
      state.cardList = []
      state.cardListString = ''
      state.showDialog = false
    },

    setCardString: (state, action: PayloadAction<string>) => {
      const cardListString = action.payload
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

      state.cardListString = cardListString

      if (error) {
        state.error = error
        state.cardList = []
      } else {
        state.error = ''
        state.cardList = cardList
      }
    },

    move: (
      state,
      action: PayloadAction<{ cardObj: FormattedCard; isCommander: boolean }>
    ) => {
      const { cardObj, isCommander } = action.payload

      if (isCommander) {
        state.cardObjs.others = [...state.cardObjs.others, cardObj]
        state.cardObjs.commanders = state.cardObjs.commanders.filter(
          card => card.card.name !== cardObj.card.name
        )
      } else {
        state.cardObjs.commanders = [...state.cardObjs.commanders, cardObj]
        state.cardObjs.others = state.cardObjs.others.filter(
          card => card.card.name !== cardObj.card.name
        )
      }
    },

    changeCount: (
      state,
      action: PayloadAction<{
        cardObj: FormattedCard
        isCommander: boolean
        increment: boolean
      }>
    ) => {
      const { cardObj, isCommander, increment } = action.payload

      const list = isCommander
        ? state.cardObjs.commanders
        : state.cardObjs.others
      const filtered = list.filter(card => card.card.name !== cardObj.card.name)

      const newList = [
        ...filtered,
        { ...cardObj, amount: cardObj.amount + (increment ? 1 : -1) }
      ]

      if (isCommander) {
        state.cardObjs.commanders = newList
      } else {
        state.cardObjs.others = newList
      }
    },

    clearError: state => {
      state.error = ''
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    }
  }
})

export const {
  open,
  close,
  download,
  cancel,
  setCardString,
  setName
} = toadVillageSlice.actions
const {
  changeCount,
  move,
  clearError,
  setError,
  resetCardObjs,
  startFetch,
  deckResponse
} = toadVillageSlice.actions

export const selectToadVillage = (state: RootState) => state.toadVillage

export default toadVillageSlice.reducer
