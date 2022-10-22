import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState, AppDispatch, GetState } from '../../store'
import { setAlert } from '../alert'

type AuthState = {
  registering: boolean
  token: string | null
  loading: boolean
}

const initialState: AuthState = {
  registering: false,
  token: null,
  loading: false
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
    },

    startLogin: (state: AuthState) => {
      state.loading = true
    },

    finishLogin: (state: AuthState) => {
      state.loading = false
    }
  }
})

export const { loadSavedToken, toggleRegister } = authSlice.actions
const { setSavedToken, startLogin, finishLogin } = authSlice.actions

export const attemptLogin = (username: string, password: string) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const { registering } = selectAuth(getState())

    dispatch(startLogin())

    try {
      const toSend = { username, password }
      console.log({ toSend })

      if (registering) {
      } else {
      }

      dispatch(setAlert('SOMETHING HERE'))
    } catch (err) {
      console.log({ err })
    } finally {
      dispatch(finishLogin())
    }
  }
}

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
