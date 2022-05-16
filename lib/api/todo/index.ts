import { TodoItem } from '../../../shared/todo'

import { wrapCall } from '..'

type ParamsType = {
  id: string
  items?: TodoItem[]
}

const todo = async (data: ParamsType) => {
  const res = await wrapCall<{ data: TodoItem[] }>({
    method: 'POST',
    uri: '/todo',
    data,
    unpack: false
  })

  return res
}

export default todo
