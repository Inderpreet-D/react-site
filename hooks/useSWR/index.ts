import useBaseSWR from 'swr'

import { wrapCall } from '../../lib/api'

type SWRType = string | (() => string | null)

const useSWR = <T>(url: SWRType) => {
  const { data, error } = useBaseSWR(
    () => {
      if (typeof url === 'string') {
        return `/${url}`
      }

      const val = url()
      if (val) {
        return `/${val}`
      }

      return null
    },
    async uri => await wrapCall<T>({ method: 'GET', uri })
  )

  return {
    data: data as T,
    isLoading: !error && !data,
    isError: Boolean(error)
  }
}

export default useSWR
