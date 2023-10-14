import { Handlers, SocketHandler } from '../../types'

export const TREACHERY_WAIT = 'treachery.wait'

const waitHandler: SocketHandler<any> = ({ socket, data, ack }) => {
  console.log('Test', { data, ack })

  if (ack) {
    ack({ data, res: 'Here, test' })
  }
}

const handlers: Handlers = [[TREACHERY_WAIT, waitHandler]]

export default handlers
