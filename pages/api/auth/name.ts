import { NextApiRequest, NextApiResponse } from 'next'

import { buildFullUser, isNameAvailable, saveUser } from './helpers'

const api = async (req: NextApiRequest, res: NextApiResponse & Locals) => {
  const { name } = req.body as { name: string }
  const { user } = res.locals

  if (!user) {
    res.status(400).send('User could not be found.')
    return
  }

  try {
    const isValid = await isNameAvailable(name, user.id)

    if (!isValid) {
      res.status(400).send('Username is not valid.')
      return
    }

    const newUser: User = { ...user, name }
    await saveUser(newUser)

    const fullUser = await buildFullUser(newUser)

    if (typeof fullUser === 'string') {
      res.status(400).send(fullUser)
    } else {
      res.send({ user: fullUser })
    }
  } catch (err) {
    console.error('Error changing username: ', err)
    res.status(500).send((err as Error).message)
  }
}

export default api
