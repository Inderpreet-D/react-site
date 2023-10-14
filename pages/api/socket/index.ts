import { Server as NetServer, Socket } from 'net'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'

import handlers from './handlers'

type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: Server
    }
  }
}

const api = async (_: NextApiRequest, res: NextApiResponseServerIO) => {
  // Prevent multiple server instances
  if (res.socket.server.io) {
    res.end()
    return
  }

  // Create socket io server and set in res
  // @ts-ignore
  const io = new Server(res.socket.server, {
    addTrailingSlash: false
  })
  res.socket.server.io = io

  // Socket io handlers
  io.on('connection', socket => {
    handlers.forEach(([eventName, handler]) => {
      socket.on(eventName, (data, ack) => handler({ socket, data, ack }))
    })
  })

  // Prevent stalled requests
  res.end()
}

export default api
