import { NextApiRequest, NextApiResponse } from 'next'

import { get } from '../../../utilities/helpers/database'

const URL = 'recordPassword'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const { password } = req.body as { password: string }
  const storedPass = await get(URL)
  res.send({ match: password === storedPass.val() })
}

export default api
