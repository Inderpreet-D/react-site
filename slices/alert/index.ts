import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState, AppDispatch, GetState } from '../../store'

const DURATION = 5000

type AlertState = {
  alert: string
  isError: boolean
  timer: NodeJS.Timeout | null
}

const initialState: AlertState = {
  alert: '',
  isError: true,
  timer: null
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    updateAlert: (
      state: AlertState,
      action: PayloadAction<{
        alert: string
        isError: boolean
        timer: NodeJS.Timeout | null
      }>
    ) => {
      const { alert, isError, timer } = action.payload
      state.alert = alert
      state.isError = isError
      state.timer = timer
    }
  }
})

const { updateAlert } = alertSlice.actions

export const setAlert = (
  alert: string,
  isError: boolean,
  duration = DURATION
) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const { timer } = selectAlert(getState())

    if (timer) {
      clearTimeout(timer)
    }

    const newTimer = setTimeout(() => {
      dispatch(updateAlert({ alert: '', isError, timer: null }))
    }, duration)
    dispatch(updateAlert({ alert, isError, timer: newTimer }))
  }
}

export const selectAlert = (state: RootState) => state.alert

export default alertSlice.reducer
