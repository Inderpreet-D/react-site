import { Handlers, SocketHandler } from '../../types'

export const CARD_DB_SEARCH = 'cardDB.search'

const searchHandler: SocketHandler<string> = ({ /*socket,*/ data, ack }) => {
  console.log('Test search', { data, ack })

  if (ack) {
    ack({ data, res: 'Here, test search' })
  }
}

const handlers: Handlers = [[CARD_DB_SEARCH, searchHandler]]

export default handlers
