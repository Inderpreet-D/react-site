import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState, AppDispatch, GetState } from '../../store'

type AuthState = {
  registering: boolean
  token: string | null
}

const initialState: AuthState = {
  registering: false,
  token: null
}

const TOKEN_KEY = 'inderpreetd.token'

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadSavedToken: (state: AuthState) => {
      const savedToken = window.localStorage.getItem(TOKEN_KEY)
      state.token = savedToken
    },

    setSavedToken: (
      state: AuthState,
      { payload }: PayloadAction<string | null>
    ) => {
      state.token = payload
      window.localStorage.setItem(TOKEN_KEY, payload ?? '')
    },

    toggleRegister: (state: AuthState) => {
      state.registering = !state.registering
    }
  }
})

export const { loadSavedToken, toggleRegister } = authSlice.actions
const { setSavedToken } = authSlice.actions

// TODO: Add login and register methods

export const logout = () => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const { token } = selectAuth(getState())
    if (token) {
      console.log({ revoke: token })
    } else {
      console.log('No token')
    }

    // TODO: Revoke token
    dispatch(setSavedToken(null))
  }
}

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
