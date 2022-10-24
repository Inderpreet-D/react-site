import useBaseSWR from 'swr'
import { useAppDispatch } from '../redux'

import { wrapCall } from '../../lib/api'
import { setAlert } from '../../slices/alert'

type SWRType = string | (() => string | null)

const useSWR = <T>(url: SWRType) => {
  const dispatch = useAppDispatch()

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

  // Show errors
  React.useEffect(() => {
    if (error) {
      const message = error.response.data
      dispatch(setAlert(message))
    }
  }, [error, dispatch])

  return {
    data: data as T,
    isLoading: !error && !data,
    isError: Boolean(error)
  }
}

export default useSWR
