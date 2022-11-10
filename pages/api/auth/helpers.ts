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

export const getProfileByID = async (id: string) => {
  return await get<Profile>(`${PROFILE_BASE}/${id}`)
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

export const saveUser = async (user: User) => {
  await set(`${USER_BASE}/${user.id}`, user)
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

const hashPassword = (password: string) => {
  const salt = randomBytes(128).toString('base64')
  const iterations = 100000
  const hash = pbkdf2Sync(password, salt, iterations, KEYLEN, DIGEST)
  return { salt, iterations, hashedPassword: hash.toString('hex') }
}

export const createUser = async (username: string, password: string) => {
  const passwordHash = hashPassword(password)
  const profile = await createProfile()

  const user: User = {
    id: uuidv4(),
    name: username,
    profile,
    ...passwordHash
  }

  await saveUser(user)

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

export const buildFullUser = async (user: User | null) => {
  if (!user) {
    return 'User could not be found.'
  }

  const profileInfo = await getProfileByID(user.profile)

  if (!profileInfo) {
    return 'User profile could not be found.'
  }

  const { id, ...profile } = profileInfo

  const fullUser: FullUser = {
    id: user.id,
    name: user.name,
    profile
  }

  return fullUser
}

export const isNameAvailable = async (name: string, id: string) => {
  const allUsers = await getUsers()

  if (!allUsers) {
    return true
  }

  const matchingUsers = Object.values(allUsers).filter(
    user => user.name === name && user.id !== id
  )

  return matchingUsers.length === 0
}

export const changePassword = async (password: string, user: User | null) => {
  if (!user) {
    return 'User could not be found.'
  }

  const passwordHash = hashPassword(password)

  const newUser: User = {
    ...user,
    ...passwordHash
  }

  await saveUser(newUser)

  return true
}
