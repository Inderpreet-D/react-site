import { Request, Response, NextFunction } from 'express'

const sslRedirect = (environments = ['production'], status = 302) => {
  const currentEnv = process.env.NODE_ENV
  const isCurrentEnv = environments.includes(currentEnv)

  return (req: Request, res: Response, next: NextFunction) => {
    if (isCurrentEnv && req.headers['x-forwarded-proto'] !== 'https') {
      const { hostname, originalUrl } = req
      const newUrl = `https://${hostname}${originalUrl}`
      res.redirect(status, newUrl)
    } else {
      next()
    }
  }
}

export default sslRedirect
