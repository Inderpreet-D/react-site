import { RedditResponse } from '../../../shared/reddit'

import { wrapCall, WrappedParams } from '..'

const reddit = async () => {
  const params: WrappedParams = {
    method: 'GET',
    uri: '/reddit',
    unpack: false
  }
  return await wrapCall<RedditResponse>(params)
}

export default reddit
