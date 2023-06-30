import { type HttpRequest, type Controller } from '../../presentations/protocols'
import { type Request, type Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const { statusCode, body } = await controller.handle(httpRequest)

    if (statusCode === 200) {
      return res.status(statusCode).send(body)
    }
    return res.status(statusCode).json({
      error: body.message
    })
  }
}
