import express from 'express'
import next from 'next'

import dotenv from 'dotenv'
import fs from 'fs'

if (process.env.GITHUB_ACTIONS === 'true') {
  const files = fs.readdirSync(process.cwd())
  console.log({ files })
  console.log({ process: process.env })
  dotenv.config()
}

import processHttps from './http'
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
    server.use(processHttps)

    // Auth token verification
    server.use(processAuthToken)

    const handle = app.getRequestHandler()
    server.get('*', (req, res) => handle(req, res))
    server.post('*', (req, res) => handle(req, res))
    server.put('*', (req, res) => handle(req, res))
    server.delete('*', (req, res) => handle(req, res))

    server.listen(port, () => {
      console.log(`⚡ Listening on port ${port}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

runServer()
