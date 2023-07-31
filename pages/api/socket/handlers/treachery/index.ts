import { Handlers, SocketHandler } from '../../types'

export const TREACHERY_TEST = 'treachery.test'

const handler: SocketHandler<any> = ({ socket, data, ack }) => {
  ack({ data, res: 'Here, test' })
}

const handlers: Handlers = [[TREACHERY_TEST, handler]]

export default handlers
