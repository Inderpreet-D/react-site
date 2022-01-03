import { NextApiRequest, NextApiResponse } from 'next'

import { get } from '../../../utilities/helpers/database'

const URL = 'competitive'

const api = async (_: NextApiRequest, res: NextApiResponse) => {
  const data = await get(URL)
  const val = data.val()
  res.send(val)
}

export default api
