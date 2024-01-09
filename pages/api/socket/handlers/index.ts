import { Handlers } from '../types'

import cardDBHandlers from './cardDB'
import treacheryHandlers from './treachery'

const handlers: Handlers = [...cardDBHandlers, ...treacheryHandlers]

export default handlers
