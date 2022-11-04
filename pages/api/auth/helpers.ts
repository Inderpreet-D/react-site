import { randomBytes, pbkdf2Sync } from 'crypto'
import { v4 as uuidv4 } from 'uuid'

import { get, set } from '../../../utilities/helpers/database'

const BASE = 'authentication'
const PROFILE_BASE = `${BASE}/profiles`
const TOKEN_BASE = `${BASE}/tokens`
const USER_BASE = `${BASE}/users`

const KEYLEN = 64
const DIGEST = 'sha512'

export const getProfiles = async () => {
  return await get<ProfilesTable>(PROFILE_BASE)
}

export const getTokens = async () => {
  return await get<TokensTable>(TOKEN_BASE)
}

const setTokens = async (newTokens: TokensTable) => {
  return await set(TOKEN_BASE, newTokens)
}

export const getUsers = async () => {
  return await get<UsersTable>(USER_BASE)
}

export const getUserByID = async (id: string) => {
  return await get<User>(`${USER_BASE}/${id}`)
}

export const getUserByName = async (username: string) => {
  const users = await getUsers()
  if (users) {
    const user = Object.values(users).find(u => u.name === username)
    return user
  } else {
    return null
  }
}

const createProfile = async () => {
  const profile: Profile = {
    id: uuidv4()
  }
  await set(`${PROFILE_BASE}/${profile.id}`, profile)
  return profile.id
}

export const createToken = async (userID: string) => {
  const url = `${TOKEN_BASE}/${userID}`
  const existingTokens = (await get<Token | null>(url)) ?? []

  let id = uuidv4()
  while (existingTokens.includes(id)) {
    id = uuidv4()
  }
  existingTokens.push(id)

  await set(url, existingTokens)
  return id
}

export const createUser = async (username: string, password: string) => {
  const salt = randomBytes(128).toString('base64')
  const iterations = 100000
  const hash = pbkdf2Sync(password, salt, iterations, KEYLEN, DIGEST)

  const profile = await createProfile()

  const user: User = {
    hashedPassword: hash.toString('hex'),
    id: uuidv4(),
    iterations,
    name: username,
    profile,
    salt
  }

  await set(`${USER_BASE}/${user.id}`, user)

  return await createToken(user.id)
}

export const findUserByToken = async (token: string) => {
  const tokens = await getTokens()

  if (!tokens) {
    return null
  }

  const findResult = Object.entries(tokens).find(([_, inUse]) => {
    return inUse.includes(token)
  })

  if (findResult) {
    return await getUserByID(findResult[0])
  } else {
    return null
  }
}

export const validateUser = async (username: string, password: string) => {
  const user = await getUserByName(username)

  if (!user) {
    return false
  }

  const { hashedPassword, iterations, salt } = user
  return (
    hashedPassword ===
    pbkdf2Sync(password, salt, iterations, KEYLEN, DIGEST).toString('hex')
  )
}

export const doesUserExist = async (username: string) => {
  return Boolean(await getUserByName(username))
}

export const deleteToken = async (token: string) => {
  const tokens = await getTokens()

  if (!tokens) {
    return
  }

  const updated = Object.entries(tokens).reduce((acc, [userID, tokens]) => {
    acc[userID] = tokens.filter(t => t !== token)
    return acc
  }, {} as TokensTable)

  await setTokens(updated)
}
