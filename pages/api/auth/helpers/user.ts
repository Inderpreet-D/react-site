import { randomBytes, pbkdf2Sync } from 'crypto'
import { v4 as uuidv4 } from 'uuid'

import { createProfile } from './profile'
import {
  saveUser,
  getTokens,
  getUserByID,
  getProfileByID,
  getUsers
} from './storage'
import { createToken } from './token'

//* Password operations

const KEYLEN = 64
const DIGEST = 'sha512'

const hashPassword = (password: string) => {
  const salt = randomBytes(128).toString('base64')
  const iterations = 100000

  const hash = pbkdf2Sync(password, salt, iterations, KEYLEN, DIGEST)

  return {
    salt,
    iterations,
    hashedPassword: hash.toString('hex')
  }
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

//* User operations

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

export const getUserByName = async (username: string) => {
  const users = await getUsers()
  if (users) {
    const user = Object.values(users).find(u => u.name === username)
    return user
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

export const changeUsername = async (user: User, name: string) => {
  const newUser: User = { ...user, name }

  await saveUser(newUser)

  return await buildFullUser(newUser)
}
