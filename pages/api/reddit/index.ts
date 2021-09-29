import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import { RedditRawResponse, RedditResponse } from '../../../shared/reddit'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const response: RedditRawResponse = await axios.get(
    'https://www.reddit.com/r/poetry/hot.json'
  )
  const data: RedditResponse = response.data

  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(data)
}

export default api
