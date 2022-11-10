import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState, AppDispatch, GetState } from '../../store'

import {
  register,
  login,
  logout as apiLogout,
  verify as apiVerify,
  getFullUser,
  changeUsername,
  changePassword
} from '../../lib/api/auth'
import { setAlert } from '../alert'

type AuthState = {
  registering: boolean
  token: string | null
  loading: boolean
  isLoggedIn: boolean
  user: FullUser | null
}

const initialState: AuthState = {
  registering: false,
  token: null,
  loading: false,
  isLoggedIn: false,
  user: null
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
      { payload: token }: PayloadAction<string | null>
    ) => {
      state.token = token
      window.localStorage.setItem(TOKEN_KEY, token ?? '')
    },

    toggleRegister: (state: AuthState) => {
      state.registering = !state.registering
    },

    startLogin: (state: AuthState) => {
      state.loading = true
    },

    finishLogin: (
      state: AuthState,
      { payload: isLoggedIn }: PayloadAction<boolean>
    ) => {
      state.loading = false
      state.isLoggedIn = isLoggedIn
    },

    finishLogout: (state: AuthState) => {
      state.isLoggedIn = false
    },

    setUser: (
      state: AuthState,
      { payload: user }: PayloadAction<FullUser | null>
    ) => {
      state.user = user
    }
  }
})

export const { loadSavedToken, toggleRegister } = authSlice.actions
const {
  setSavedToken,
  startLogin,
  finishLogin,
  finishLogout,
  setUser
} = authSlice.actions

const endLogin = (result: boolean) => {
  return async (dispatch: AppDispatch) => {
    if (!result) {
      dispatch(finishLogin(false))
      return
    }

    try {
      const user = await getFullUser()
      dispatch(setUser(user))
      dispatch(finishLogin(true))
    } catch (err) {
      dispatch(setAlert(err))
      dispatch(finishLogin(false))
    }
  }
}

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
      dispatch(endLogin(success))
    }
  }
}

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    await apiLogout()
    dispatch(setSavedToken(null))
    dispatch(setUser(null))
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
      dispatch(endLogin(valid))
    }
  }
}

export const updateName = (name: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user = await changeUsername(name)
      console.log({ user })

      dispatch(setUser(user))
    } catch (err) {
      dispatch(setAlert(err))
    }
  }
}

export const updatePassword = (password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await changePassword(password)
    } catch (err) {
      dispatch(setAlert(err))
    }
  }
}

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
