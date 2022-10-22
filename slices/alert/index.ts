import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState, AppDispatch } from '../../store'

type AlertState = {
  alert: string
  isError: boolean
}

const initialState: AlertState = {
  alert: '',
  isError: true
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
      }>
    ) => {
      const { alert, isError } = action.payload
      state.alert = alert
      state.isError = isError
    }
  }
})

const { updateAlert } = alertSlice.actions

export const setAlert = (alert: string, isError: boolean = true) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateAlert({ alert, isError }))
  }
}

export const selectAlert = (state: RootState) => state.alert

export default alertSlice.reducer
