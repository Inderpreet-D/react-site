import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

import { TOKEN_KEY } from '../../slices/auth'

// ~~~~~~ HELPER METHODS ~~~~~~
const callGet = axios.get as AxiosFunc
const callPost = axios.post as AxiosFunc
const callPut = axios.put as AxiosFunc
const callDelete = axios.delete as AxiosFunc

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

const dataMethods: MethodType[] = ['POST', 'PUT']

export type WrappedParams = {
  method: MethodType
  uri: string
  data?: any
}

// Wraps a call to the appropriate method in a generic error handler
export const wrapCall = async <T>({
  method,
  uri,
  data = null
}: WrappedParams) => {
  try {
    const func = METHOD_MAP[method]

    const url = `/api${uri}`
    const token = window.localStorage.getItem(TOKEN_KEY) ?? ''
    const options = {
      headers: {
        Authorization: `token ${token}`
      }
    }

    if (!dataMethods.includes(method)) {
      const response = await func(url, options)
      return response.data as T
    }

    const response = await func(url, data, options)
    return response.data as T
  } catch (err) {
    console.error(`Error on ${method} ${uri}`, err)
    throw err
  }
}

export { default as reddit } from './reddit'
export { default as toadvillage } from './toadvillage'
export { default as todo } from './todo'
