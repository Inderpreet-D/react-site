import { v4 as uuidv4 } from 'uuid'

import {
  getTokensForUser,
  saveTokensForUser,
  getTokens,
  setTokens
} from './storage'

export const createToken = async (userID: string) => {
  const existingTokens = (await getTokensForUser(userID)) ?? []

  let id = uuidv4()
  while (existingTokens.includes(id)) {
    id = uuidv4()
  }
  existingTokens.push(id)

  await saveTokensForUser(userID, existingTokens)

  return id
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
