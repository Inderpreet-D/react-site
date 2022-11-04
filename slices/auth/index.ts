import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState, AppDispatch, GetState } from '../../store'

import {
  register,
  login,
  logout as apiLogout,
  verify as apiVerify
} from '../../lib/api/auth'
import { setAlert } from '../alert'

type AuthState = {
  registering: boolean
  token: string | null
  loading: boolean
  isLoggedIn: boolean
}

const initialState: AuthState = {
  registering: false,
  token: null,
  loading: false,
  isLoggedIn: false
}

export const TOKEN_KEY = 'inderpreetd.token'

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

    finishLogin: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = false
      state.isLoggedIn = action.payload
    },

    finishLogout: (state: AuthState) => {
      state.isLoggedIn = false
    }
  }
})

export const { loadSavedToken, toggleRegister } = authSlice.actions
const {
  setSavedToken,
  startLogin,
  finishLogin,
  finishLogout
} = authSlice.actions

export const attemptLogin = (username: string, password: string) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    const { registering } = selectAuth(getState())

    dispatch(startLogin())
    let success = false

    try {
      const token = await (registering ? register : login)(username, password)
      dispatch(setSavedToken(token))
      success = true
    } catch (err) {
      dispatch(setAlert(err))
    } finally {
      dispatch(finishLogin(success))
    }
  }
}

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    await apiLogout()
    dispatch(setSavedToken(null))
    dispatch(finishLogout())
  }
}

export const verify = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLogin())
    let valid = false

    try {
      valid = await apiVerify()
      const token = window.localStorage.getItem(TOKEN_KEY)
      dispatch(setSavedToken(token))
    } catch {
      dispatch(setSavedToken(null))
    } finally {
      dispatch(finishLogin(valid))
    }
  }
}

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
