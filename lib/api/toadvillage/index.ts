import { ReqCard } from '../../../shared/toadvillage'
import { QueueType } from '../../../pages/api/toadvillage/types'

import { wrapCall } from '..'

type ParamsType = { id: string; cards?: ReqCard[] }

const toadvillage = async (data: ParamsType) => {
  const res = await wrapCall<QueueType>({
    method: 'POST',
    uri: '/toadvillage',
    data
  })
  return { data: res }
}

export default toadvillage
