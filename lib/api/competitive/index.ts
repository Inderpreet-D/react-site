import { wrapCall } from '..'

import { Game } from '../../../components/pages/Competitive'

export const checkPassword = async (password: string) => {
  const { match } = await wrapCall<{ match: boolean }>({
    method: 'POST',
    uri: '/record/password',
    data: { password }
  })
  return match
}

export const getSeasons = async () => {
  const { seasons } = await wrapCall<{ seasons: string[] }>({
    method: 'GET',
    uri: '/record/seasons'
  })
  return seasons
}

export const postSeason = async (name: string) => {
  const { seasons } = await wrapCall<{ seasons: string[] }>({
    method: 'POST',
    uri: '/record/seasons',
    data: { name }
  })
  return seasons
}

export const postRecord = async (season: string, game: Game) => {
  return await wrapCall({
    method: 'POST',
    uri: '/record',
    data: { season, game }
  })
}
