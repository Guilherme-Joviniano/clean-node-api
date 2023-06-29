import { type Middleware } from '../../protocols/middleware.protocol'

export const contentType: Middleware = (req, res, next) => {
  res.type('json')

  next()
}
