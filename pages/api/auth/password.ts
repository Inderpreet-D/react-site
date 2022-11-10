import { NextApiRequest, NextApiResponse } from 'next'

const api = async (req: NextApiRequest, res: NextApiResponse & Locals) => {
  const { password } = req.body as { password: string }

  console.log({ password })

  res.end()
}

export default api
