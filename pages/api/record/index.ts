import { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '../../../components/pages/Competitive'

import { getSeasons } from '../competitive'
import { setSeasons } from './seasons'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { season, game } = req.body as { season: string; game: Game }

  const seasons = await getSeasons()
  const targetSeason = seasons.find(s => s.name === season)!
  targetSeason.games = [...(targetSeason.games ?? []), game]

  setSeasons(seasons)
  res.send({ done: true })
}

export default api
