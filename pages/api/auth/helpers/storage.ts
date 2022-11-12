import { get, set } from '../../../../utilities/helpers/database'

const BASE = 'authentication'
const PROFILE_BASE = `${BASE}/profiles`
const TOKEN_BASE = `${BASE}/tokens`
const USER_BASE = `${BASE}/users`

//* Profiles

export const getProfiles = async () => {
  return await get<ProfilesTable>(PROFILE_BASE)
}

export const getProfileByID = async (id: string) => {
  return await get<Profile>(`${PROFILE_BASE}/${id}`)
}

export const saveProfile = async (profile: Profile) => {
  return await set(`${PROFILE_BASE}/${profile.id}`, profile)
}

//* Tokens

export const getTokens = async () => {
  return await get<TokensTable>(TOKEN_BASE)
}

export const getTokensForUser = async (userID: string) => {
  return await get<Token>(`${TOKEN_BASE}/${userID}`)
}

export const setTokens = async (newTokens: TokensTable) => {
  return await set(TOKEN_BASE, newTokens)
}

export const saveTokensForUser = async (userID: string, tokens: Token) => {
  return await set(`${TOKEN_BASE}/${userID}`, tokens)
}

//* Users

export const getUsers = async () => {
  return await get<UsersTable>(USER_BASE)
}

export const getUserByID = async (id: string) => {
  return await get<User>(`${USER_BASE}/${id}`)
}

export const saveUser = async (user: User) => {
  return await set(`${USER_BASE}/${user.id}`, user)
}
