import { type NextFunction, type Response, type Request } from 'express'

export type Middleware = (req: Request, res: Response, next: NextFunction) => void
