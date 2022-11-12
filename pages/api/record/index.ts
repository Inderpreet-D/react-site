import { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '../../../components/pages/Competitive'

import { getSeasons } from '../competitive'
import { setSeasons } from './seasons'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { season, game } = req.body as { season: string; game: Game }

  try {
    const seasons = await getSeasons()
    const targetSeason = seasons!.find(s => s.name === season)!
    targetSeason.games = [...(targetSeason.games ?? []), game]
    await setSeasons(seasons!)
  } catch (err) {
    console.error('Error creating record', err)
  }

  res.send({ done: true })
}

export default api
