import { get } from '../../../utilities/helpers/database'

const BASE = 'authentication'

export const getAccounts = async () => {
  const accounts = await get(`${BASE}/accounts`)
  return accounts.val() as AccountsTable
}

export const getTokens = async () => {
  const tokens = await get(`${BASE}/tokens`)
  return tokens.val() as TokensTable
}

export const getUsers = async () => {
  const users = await get(`${BASE}/users`)
  return users.val() as UsersTable
}
