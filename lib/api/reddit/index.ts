import { RedditResponse } from '../../../shared/reddit'

import { wrapCall } from '..'

const reddit = async () => {
  const data = await wrapCall<RedditResponse>({ method: 'GET', uri: '/reddit' })
  return { data }
}

export default reddit
