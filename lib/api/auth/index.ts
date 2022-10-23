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
  return await wrapCall({ method: 'DELETE', uri: `/auth/token` })
}

export const deactivate = async () => {
  return await wrapCall({ method: 'DELETE', uri: '/auth' })
}
