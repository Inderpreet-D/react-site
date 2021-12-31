import { NextApiRequest, NextApiResponse } from 'next'

import { get } from '../../../utilities/helpers/database'

const URL = 'movies'

const api = async (_: NextApiRequest, res: NextApiResponse) => {
  const data = await get(URL)
  const val = data.val()
  const keys = Object.keys(val)
  res.send(keys)
}

export default api
