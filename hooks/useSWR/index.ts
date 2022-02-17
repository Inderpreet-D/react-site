import axios from 'axios'
import useBaseSWR from 'swr'

type SWRType = string | (() => string | null)

const useSWR = <T>(url: SWRType) => {
  const { data, error } = useBaseSWR(() => {
    if (typeof url === 'string') {
      return `/api/${url}`
    }

    const val = url()
    if (val) {
      return `/api/${val}`
    }

    return null
  }, axios.get)

  return {
    data: (data as any)?.data as T,
    isLoading: !error && !data,
    isError: Boolean(error)
  }
}

export default useSWR
