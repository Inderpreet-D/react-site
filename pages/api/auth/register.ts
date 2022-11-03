import { NextApiRequest, NextApiResponse } from 'next'

import {
  createUser,
  doesUserExist,
  findUserByToken,
  getProfiles,
  getTokens,
  getUsers,
  validateUser
} from './helpers'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body as {
    username: string
    password: string
  }
  console.log('AT API', { username, password })
  // res.status(200).send({ token: 'TEST TOKEN' })
  const profiles = await getProfiles()
  const tokens = await getTokens()
  const users = await getUsers()

  console.log({ profiles, tokens, users })

  try {
    // const token = await createUser(username, password)
    // console.log({ token })

    // const user = await findUserByToken('ee3501cd-e468-4bf4-b5f0-abb159ca358c')
    // console.log({ user })

    // const valid = await validateUser(username, password)
    // console.log({ valid })

    const exists = await doesUserExist(username)
    console.log({ exists })

    res.status(400).send('Get shit on')
  } catch (err) {
    res.status(500).send((err as Error).message)
  }
}

export default api
