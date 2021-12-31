import axios from 'axios'
import useBaseSWR from 'swr'

const useSWR = (url: string) => {
  const { data, error } = useBaseSWR(`/api/${url}`, axios.get)

  return {
    data: (data as any)?.data,
    isLoading: !error && !data,
    isError: Boolean(error)
  }
}

export default useSWR
