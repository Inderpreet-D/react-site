import { NextApiRequest, NextApiResponse } from 'next'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body as {
    username: string
    password: string
  }
  console.log('AT API', { username, password })
  res.status(200).send({ token: 'TEST TOKEN' })
}

export default api
