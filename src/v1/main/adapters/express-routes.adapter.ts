import { type HttpRequest, type Controller } from '../../presentations/protocols'
import { type Request, type Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).send(httpResponse.body)
  }
}
