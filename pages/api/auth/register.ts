import { NextApiRequest, NextApiResponse } from 'next'

import { getAccounts, getTokens, getUsers } from './helpers'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body as {
    username: string
    password: string
  }
  console.log('AT API', { username, password })
  // res.status(200).send({ token: 'TEST TOKEN' })
  const accounts = await getAccounts()
  const tokens = await getTokens()
  const users = await getUsers()

  console.log({ accounts, tokens, users })

  res.status(400).send('Get shit on')
}

export default api
