import { NextApiRequest, NextApiResponse } from 'next'

import { deleteToken } from './helpers'

const api = async (req: NextApiRequest, res: NextApiResponse & Locals) => {
  if (req.method === 'GET') {
    const { token, user } = res.locals
    const valid = Boolean(token) && Boolean(user)
    res.send({ valid })
    return
  }

  if (req.method === 'DELETE') {
    const { token } = res.locals
    if (token) {
      await deleteToken(token)
    }
    res.end()
  }

  res.status(404).end()
}

export default api
