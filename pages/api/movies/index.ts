import { NextApiRequest, NextApiResponse } from 'next'

import { get } from '../../../utilities/helpers/database'

const URL = 'movies'

const api = async (_: NextApiRequest, res: NextApiResponse) => {
  const data = await get<MoviesTable>(URL)
  const keys = Object.keys(data)
  res.send(keys)
}

export default api
