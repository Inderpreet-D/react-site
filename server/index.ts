import express, { Request, Response, NextFunction } from 'express'
import next from 'next'
// import sslRedirect from 'heroku-ssl-redirect'

import dotenv from 'dotenv'
dotenv.config()

import processAuthToken from './auth'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = process.env.PORT || 3000

const sslRedirect = (environments = ['production'], status = 302) => {
  const currentEnv = process.env.NODE_ENV
  const isCurrentEnv = environments.includes(currentEnv)
  return (req: Request, res: Response, next: NextFunction) => {
    if (isCurrentEnv && req.headers['x-forwarded-proto'] !== 'https') {
      const newUrl = 'https://' + req.hostname + req.originalUrl
      console.log({
        newUrl,
        host: req.get('host'),
        orig: req.originalUrl,
        url: req.url
      })

      res.redirect(status, newUrl)
    } else {
      next()
    }
  }
}

const runServer = async () => {
  try {
    await app.prepare()

    const server = express()
    server.use(express.json())

    // HTTP to HTTPS re-routing
    // server.use(sslRedirect())
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
