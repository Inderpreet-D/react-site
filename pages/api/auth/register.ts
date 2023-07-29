import { NextApiRequest, NextApiResponse } from 'next'

import { doesUserExist, createUser } from './helpers'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body as {
    username: string
    password: string
  }

  try {
    if (await doesUserExist(username)) {
      res.status(400).send('Username already exists.')
      return
    }

    const token = await createUser(username, password)
    res.send({ token })
  } catch (err) {
    res.status(500).send((err as Error).message)
    console.error('Error registering: ', err)
  }
}

export default api
