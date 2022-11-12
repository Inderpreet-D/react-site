import { NextApiRequest, NextApiResponse } from 'next'

import { buildFullUser } from './helpers'

const api = async (_: NextApiRequest, res: NextApiResponse & Locals) => {
  try {
    const user = await buildFullUser(res.locals.user)

    if (typeof user === 'string') {
      res.status(400).send(user)
      return
    }

    res.send({ user })
  } catch (err) {
    console.error('Error getting user: ', err)
    res.status(500).send((err as Error).message)
  }
}

export default api
