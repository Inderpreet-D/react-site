import { Request, Response } from 'express'

const processHttps = async (
  req: Request,
  res: Response,
  next: CallableFunction
) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect(301, `https://${req.hostname}${req.url}`)
    return
  }

  res.setHeader(
    'strict-transport-security',
    'max-age=31536000; includeSubDomains; preload'
  )

  next()
}

export default processHttps
