import axios from 'axios'

import { ApiRequest as TreacheryRequest } from '../pages/api/treachery/types'

export const treachery = async <T>(queryParams: TreacheryRequest) => {
  const params = queryParams as { [x: string]: any }
  const query = Object.keys(params)
    .filter(key => params[key])
    .map(param => `${param}=${params[param]}`)
    .join('&')

  try {
    const data = await axios.get(`/api/treachery?${query}`)
    return data.data as T
  } catch (err) {
    throw err
  }
}
