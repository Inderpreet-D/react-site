import { NextApiRequest, NextApiResponse } from 'next'

import { Season } from '../../../components/pages/Competitive'
import { getSeasons } from '../competitive'
import { set } from '../../../utilities/helpers/database'

const URL = 'competitive'

export const setSeasons = async (seasons: Season[]) => {
  await set(URL, seasons)
}

const handleGet = async (_: NextApiRequest, res: NextApiResponse) => {
  const seasons = await getSeasons()
  const names = seasons!.map(v => v.name)
  res.send({ seasons: names })
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.body as { name: string }

  const seasons = await getSeasons()
  let rules: string[] = []
  if (seasons!.length > 0) {
    rules = seasons![seasons!.length - 1].rules
  }
  seasons!.push({ name, year: new Date().getFullYear(), games: [], rules })

  await setSeasons(seasons!)
  handleGet(req, res)
}

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method

  if (method === 'GET') {
    await handleGet(req, res)
  } else if (method === 'POST') {
    await handlePost(req, res)
  } else {
    res.status(404).end()
  }
}

export default api
