import { wrapCall } from '..'

export const register = async (username: string, password: string) => {
  return await wrapCall<string>({
    method: 'POST',
    uri: '/auth/register',
    data: { username, password }
  })
}

export const login = async (username: string, password: string) => {
  return await wrapCall<string>({
    method: 'POST',
    uri: '/auth/login',
    data: { username, password }
  })
}

export const logout = async () => {
  return await wrapCall<null>({ method: 'DELETE', uri: `/auth/token` })
}

export const deactivate = async () => {
  return await wrapCall<null>({ method: 'DELETE', uri: '/auth' })
}
