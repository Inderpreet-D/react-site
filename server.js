const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = process.env.PORT || 3000

const handle = app.getRequestHandler()

;(async () => {
  try {
    await app.prepare()
    const server = express()

    server.use((req, res, next) => {
      if (req.headers['x-forwarded-proto'] === 'http') {
        res.redirect(301, `https://${req.hostname}${req.url}`)
      } else {
        res.setHeader(
          'strict-transport-security',
          'max-age=31536000; includeSubDomains; preload'
        )

        next()
      }
    })

    server.get('*', (req, res) => handle(req, res))
    server.post('*', (req, res) => handle(req, res))

    server.listen(port, error => {
      if (error) throw error
      console.error(`Listening on port ${port}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
