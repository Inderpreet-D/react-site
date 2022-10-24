import { Request, Response } from 'express'
import { validate as uuidValidate, version as uuidVersion } from 'uuid'

const parseToken = async (req: Request, res: Response) => {
  res.locals.token = null
  res.locals.user = null

  const auth = req.headers.authorization
  if (!auth) {
    return
  }

  const [_, id] = auth.split(' ')
  const uuid = (id ?? '').trim()
  const isValid = uuidValidate(uuid) && uuidVersion(uuid) === 4
  if (!isValid) {
    return
  }

  res.locals.token = uuid

  // Get user from firebase
  const user = 'SOMETHING'
  console.log({ fetching: uuid, user })
  res.locals.user = user
}

const processAuthToken = async (
  req: Request,
  res: Response,
  next: CallableFunction
) => {
  parseToken(req, res)
  next()
}

export default processAuthToken
