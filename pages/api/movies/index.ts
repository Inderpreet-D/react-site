import { NextApiRequest, NextApiResponse } from 'next'

import { get } from '../../../utilities/helpers/database'

const URL = 'movies'

const api = async (_: NextApiRequest, res: NextApiResponse) => {
  const data = await get<MoviesTable>(URL)
  const titles = Object.keys(data ?? {})
  res.send(titles)
}

export default api
