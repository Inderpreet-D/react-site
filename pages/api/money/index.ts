import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount } = req.query

  const converted = await axios.get(
    `https://api.exchangerate.host/convert?from=USD&to=CAD&amount=${amount}`
  )

  res.send(converted.data.result ?? 0)
}

export default api
