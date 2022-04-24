import { NextApiRequest, NextApiResponse } from 'next'

import { Season } from '../../../components/pages/Competitive'
import { get } from '../../../utilities/helpers/database'

const URL = 'competitive'

export const getSeasons = async () => {
  const data = await get(URL)
  const seasons = data.val() as Season[]
  return seasons
}

const api = async (_: NextApiRequest, res: NextApiResponse) => {
  const seasons = await getSeasons()
  res.send(seasons)
}

export default api
