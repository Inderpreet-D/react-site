import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

// ~~~~~~ HELPER METHODS ~~~~~~
const callGet = axios.get
const callPost = axios.post
const callPut = axios.put
const callDelete = axios.delete

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

type AxiosFunc = <T = never, R = AxiosResponse<T>>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig<T>
) => Promise<R>

const METHOD_MAP: { [x in MethodType]: AxiosFunc } = {
  GET: callGet,
  POST: callPost,
  PUT: callPut,
  DELETE: callDelete
}

export type WrappedParams = {
  method: MethodType
  uri: string
  data?: any
  unpack?: boolean
}

// Wraps a call to the appropriate method in a generic error handler
export const wrapCall = async <T>({
  method,
  uri,
  data = null,
  unpack = true
}: WrappedParams) => {
  try {
    const func = METHOD_MAP[method]
    const response = await func(`/api${uri}`, data)

    if (unpack) {
      return (response.data?.data ?? null) as T
    }

    return (response as unknown) as T
  } catch (err) {
    console.error(`Error on ${method} ${uri}`, err)
    throw err
  }
}

export { default as reddit } from './reddit'
export { default as toadvillage } from './toadvillage'
