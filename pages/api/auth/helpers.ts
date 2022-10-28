import { get } from '../../../utilities/helpers/database'

const BASE = 'authentication'

export const getAccounts = async () => {
  return (await get(`${BASE}/accounts`)) as AccountsTable
}

export const getUsers = async () => {
  return (await get(`${BASE}/users`)) as UsersTable
}

export const getTokens = async () => {
  return (await get(`${BASE}/tokens`)) as TokensTable
}
