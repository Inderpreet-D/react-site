import { NextApiRequest, NextApiResponse } from 'next'

import { get, set } from '../../../utilities/helpers/database'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.action === 'push') {
    await set('test/key3', 'value3')
  }
  const data = await get('test')
  res.status(200).send(data)
}

export default api
