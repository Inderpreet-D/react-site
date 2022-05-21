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
  const resVal = (val ?? []) as TodoItem[]

  const cleaned = resVal.map(item => ({
    ...item,
    parent: item.parent ?? null,
    checked: item.checked ?? false
  }))

  res.status(200).send(cleaned)
}

export default api
