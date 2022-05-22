import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../../store'

type SureData = {
  title: string
  subtitle: string
  acceptText: string
  declineText: string
  onAccept: () => void
  onDecline: () => void
}

type SimpleSureData = {
  title: string
  subtitle?: string
  acceptText?: string
  declineText?: string
  onAccept?: () => void
  onDecline?: () => void
}

type SureState = SureData

const initialState: SureState & {
  showing: boolean
} = {
  showing: false,
  title: '',
  subtitle: '',
  acceptText: 'YES',
  declineText: 'CANCEL',
  onAccept: () => {},
  onDecline: () => {}
}

export const checkSure = createAsyncThunk(
  'sure/checkSure',
  async (arg: SimpleSureData, { dispatch }) => {
    const {
      title,
      subtitle,
      acceptText,
      declineText,
      onAccept,
      onDecline
    } = arg

    const clear = () => dispatch(endCheck())

    const data: SureData = {
      title,
      subtitle: subtitle ?? initialState.subtitle,
      acceptText: acceptText ?? initialState.acceptText,
      declineText: declineText ?? initialState.declineText,
      onAccept: () => {
        onAccept && onAccept()
        clear()
      },
      onDecline: () => {
        onDecline && onDecline()
        clear()
      }
    }

    dispatch(startCheck(data))
  }
)

const sureSlice = createSlice({
  name: 'sure',
  initialState,
  reducers: {
    startCheck: (state, action: PayloadAction<SureData>) => {
      state.showing = true

      const {
        title,
        subtitle,
        acceptText,
        declineText,
        onAccept,
        onDecline
      } = action.payload

      state.title = title
      state.subtitle = subtitle
      state.acceptText = acceptText
      state.declineText = declineText
      state.onAccept = onAccept
      state.onDecline = onDecline
    },

    endCheck: state => {
      state.showing = false
      state.title = ''
      state.subtitle = ''
      state.acceptText = 'Yes'
      state.declineText = 'No'
      state.onAccept = () => {}
      state.onDecline = () => {}
    }
  }
})

export const { endCheck } = sureSlice.actions
const { startCheck } = sureSlice.actions

export const selectSure = (state: RootState) => state.sure

export default sureSlice.reducer
