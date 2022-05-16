import { NextApiRequest, NextApiResponse } from 'next'
import { TodoItem } from '../../../shared/todo'

import { set, get } from '../../../utilities/helpers/database'

const URL = 'todos'

const api = async (req: NextApiRequest, res: NextApiResponse) => {
  const items: TodoItem[] = req.body.items
  const id: string = req.body.id

  const DATA_URL = `${URL}/${id}`

  // Upload case
  if (items) {
    await set(DATA_URL, items)
    res.status(200).send([])
    return
  }

  // Get case
  const data = await get(DATA_URL)
  const val = data.val()
  console.log({ DATA_URL, val })
  res.status(200).send(val ?? [])
}

export default api
