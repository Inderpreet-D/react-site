import express from 'express'
import next from 'next'

import dotenv from 'dotenv'
dotenv.config()

import sslRedirect from './redirect'
import processAuthToken from './auth'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = process.env.PORT || 3000

const runServer = async () => {
  try {
    await app.prepare()

    const server = express()
    server.use(express.json())

    // HTTP to HTTPS re-routing
    server.use(sslRedirect())

    // Auth token verification
    server.use(processAuthToken)

    const handle = app.getRequestHandler()
    server.all('*', (req, res) => handle(req, res))

    server.listen(port, () => {
      console.log(`⚡ Listening on port ${port}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

runServer()
