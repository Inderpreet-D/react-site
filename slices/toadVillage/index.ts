import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AppDispatch, GetState, RootState } from '../../store'
import {
  FormattedCard,
  ReqCard,
  TreacheryResponse
} from '../../shared/toadvillage'
import { DownloadInput } from '../../utilities/helpers/toadvillage/types'

import { findCard } from './helpers'
import mtgDownload, {
  randomName,
  parseJSON,
  downloadDecklist
} from '../../utilities/helpers/toadvillage'
import { toadvillage } from '../../lib/api'

export type ToadVillageState = {
  cardList: ReqCard[]
  cardListString: string
  cardObjs: TreacheryResponse
  name: string
  error: string
  loading: boolean
  showDialog: boolean
  doneFetch: boolean
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
  showDialog: false,
  doneFetch: false
}

const toadVillageSlice = createSlice({
  name: 'toadVillage',
  initialState,
  reducers: {
    open: (state: ToadVillageState) => {
      state.showDialog = true
    },

    close: (state: ToadVillageState) => {
      state.showDialog = false
    },

    deckResponse: (
      state: ToadVillageState,
      action: PayloadAction<{ data: TreacheryResponse }>
    ) => {
      const { data } = action.payload
      const { unmatched } = data

      if (unmatched.length) {
        const cardNames = unmatched.join(', ')
        const suffix = unmatched.length === 1 ? '' : 's'
        state.error = `Could not find the following card${suffix}: ${cardNames}`
      }

      if (!state.doneFetch) {
        state.cardObjs = data
      }
      state.loading = false
      state.doneFetch = true
    },

    startFetch: (state: ToadVillageState) => {
      state.loading = true
      state.error = ''
      state.doneFetch = false
    },

    download: (state: ToadVillageState) => {
      const objs = state.cardObjs as unknown as DownloadInput
      const error = mtgDownload(objs, state.name) ?? ''

      if (error) {
        state.error = error
      }
    },

    cancel: (state: ToadVillageState) => {
      state.cardList = []
      state.cardListString = ''
      state.showDialog = false
    },

    setCardString: (state: ToadVillageState, action: PayloadAction<string>) => {
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
        return
      }

      state.error = ''
      state.cardList = cardList
    },

    move: (
      state: ToadVillageState,
      action: PayloadAction<{ cardObj: FormattedCard; isCommander: boolean }>
    ) => {
      const { cardObj, isCommander } = action.payload

      if (isCommander) {
        state.cardObjs.others = [...state.cardObjs.others, cardObj]
        state.cardObjs.commanders = state.cardObjs.commanders.filter(
          card => card.card.name !== cardObj.card.name
        )
        return
      }

      state.cardObjs.commanders = [...state.cardObjs.commanders, cardObj]
      state.cardObjs.others = state.cardObjs.others.filter(
        card => card.card.name !== cardObj.card.name
      )
    },

    changeCount: (
      state: ToadVillageState,
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
        return
      }

      state.cardObjs.others = newList
    },

    clearError: (state: ToadVillageState) => {
      state.error = ''
    },

    setError: (state: ToadVillageState, action: PayloadAction<string>) => {
      state.error = action.payload
    },

    setName: (state: ToadVillageState, action: PayloadAction<string>) => {
      state.name = action.payload
    }
  }
})

export const { open, close, download, cancel, setCardString, setName } =
  toadVillageSlice.actions
const { changeCount, move, clearError, setError, startFetch, deckResponse } =
  toadVillageSlice.actions

const countChange = ({
  name,
  isCommander,
  increment
}: CardChange & { increment: boolean }) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const state = selectToadVillage(getState())
    const cardObj = findCard(name, isCommander, state)!
    dispatch(changeCount({ cardObj, isCommander, increment }))
  }
}

export const addCard = (arg: CardChange) => {
  return async (dispatch: AppDispatch) => {
    dispatch(countChange({ ...arg, increment: true }))
  }
}

export const removeCard = (arg: CardChange) => {
  return async (dispatch: AppDispatch) => {
    dispatch(countChange({ ...arg, increment: false }))
  }
}

export const moveCard = ({ name, isCommander }: CardChange) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const state = selectToadVillage(getState())
    const cardObj = findCard(name, isCommander, state)!
    dispatch(move({ cardObj, isCommander }))
  }
}

export const selectFile = (files: FileList | null) => {
  return async (dispatch: AppDispatch) => {
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
}

export const startApiWork = () => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const { cardList } = selectToadVillage(getState())

    dispatch(startFetch())
    dispatch(close())

    await toadvillage({ cards: cardList })

    const interval = setInterval(async () => {
      const { data } = await toadvillage({})
      const { status, ...rest } = data

      if (status === 'DONE') {
        clearInterval(interval)
        dispatch(deckResponse({ data: rest }))
      }
    }, 100)
  }
}

export const selectToadVillage = (state: RootState) => state.toadVillage

export default toadVillageSlice.reducer
