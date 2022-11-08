import { NextApiRequest, NextApiResponse } from 'next'
import { getProfileByID } from './helpers'

const api = async (_: NextApiRequest, res: NextApiResponse & Locals) => {
  const { user } = res.locals

  if (!user) {
    res.status(400).send('User could not be found.')
    return
  }

  try {
    const profileInfo = await getProfileByID(user.profile)

    if (!profileInfo) {
      res.status(400).send('User profile could not be found.')
      return
    }

    const { id, ...profile } = profileInfo

    const fullUser: FullUser = {
      id: user.id,
      name: user.name,
      profile
    }

    res.send({ user: fullUser })
  } catch (err) {
    console.error('Error getting user: ', err)
    res.status(500).send((err as Error).message)
  }
}

export default api
