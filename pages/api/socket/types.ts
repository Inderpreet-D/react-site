import { Socket } from 'socket.io'

export type SocketHandler<T> = (obj: {
  socket: Socket
  data: T
  ack?: CallableFunction
}) => void

export type Handlers = [string, SocketHandler<any>][]
