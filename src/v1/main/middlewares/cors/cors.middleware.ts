import { type Middleware } from '../../protocols/middleware.protocol'

export const cors: Middleware = (req, res, next) => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')

  next()
}
