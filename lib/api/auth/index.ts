import { wrapCall } from '..'

export const register = async (username: string, password: string) => {
  const { token } = await wrapCall<{ token: string }>({
    method: 'POST',
    uri: '/auth/register',
    data: { username, password }
  })
  return token
}

export const login = async (username: string, password: string) => {
  const { token } = await wrapCall<{ token: string }>({
    method: 'POST',
    uri: '/auth/login',
    data: { username, password }
  })
  return token
}

export const logout = async () => {
  return await wrapCall({ method: 'DELETE', uri: '/auth/token' })
}

export const verify = async () => {
  const { valid } = await wrapCall<{ valid: boolean }>({
    method: 'GET',
    uri: '/auth/token'
  })
  return valid
}

export const getFullUser = async () => {
  const { user } = await wrapCall<{ user: FullUser }>({
    method: 'GET',
    uri: '/auth/user'
  })
  return user
}

export const changeUsername = async (name: string) => {
  const { user } = await wrapCall<{ user: FullUser }>({
    method: 'PUT',
    uri: '/auth/name',
    data: { name }
  })
  return user
}

export const changePassword = async (password: string) => {
  return await wrapCall({
    method: 'PUT',
    uri: '/auth/password',
    data: { password }
  })
}
