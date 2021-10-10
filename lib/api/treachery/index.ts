import { ApiRequest as TreacheryRequest } from '../../../pages/api/treachery/types'

import { wrapCall } from '..'

const treachery = async <T>(queryParams: TreacheryRequest) => {
  const params = queryParams as { [x: string]: any }
  const query = Object.keys(params)
    .filter(key => params[key])
    .map(param => `${param}=${params[param]}`)
    .join('&')
  const uri = `/treachery?${query}`
  return await wrapCall<T>({ method: 'GET', uri })
}

export default treachery
