import { SignUpController } from '../../presentations/controllers/signup.controller'
import { ServerError } from '../../presentations/errors'
import { badRequest, successRequest } from '../../presentations/helpers/http.helper'
import { type HttpRequest, type HttpResponse, type Controller } from '../../presentations/protocols'
import { makeSignUpController } from '../factories/signup.factory'
import { LogControllerDecorator } from './log-controller.decorator'

interface SutTypes {
  sut: LogControllerDecorator
  controller?: Controller
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise((resolve) => { resolve(successRequest(httpRequest.body)) })
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const sut = new LogControllerDecorator(controllerStub)
  return { sut, controller: controllerStub }
}
describe('Log Decorator for Controllers', () => {
  it('should calls handle of controller', async () => {
    const { sut, controller } = makeSut()
    const controllerHandleSpy = jest.spyOn(controller, 'handle')

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'valid_email@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      }
    }

    await sut.handle(httpRequest)

    expect(controllerHandleSpy).toHaveBeenCalledWith(
      expect.objectContaining(httpRequest)
    )
  })

  it('should log if statusCode is 500', () => {
    // const { sut, controller } = makeSut()
    
  })
})
