import { ReqCard } from '../../../shared/toadvillage'
import { QueueType } from '../../../pages/api/toadvillage/types'

import { wrapCall } from '..'

type ParamsType = { id: string; cards?: ReqCard[] }

const toadvillage = async (data: ParamsType) => {
  const res = await wrapCall<{ data: QueueType }>({
    method: 'POST',
    uri: '/toadvillage',
    data,
    unpack: false
  })
  return res
}

export default toadvillage
