import { type LogErrorRepository } from '../../data/protocols/db-log-error-repository.protocol'
import { serverError, successRequest } from '../../presentations/helpers/http.helper'
import { type HttpRequest, type HttpResponse, type Controller } from '../../presentations/protocols'
import { LogControllerDecorator } from './log-controller.decorator'

interface SutTypes {
  sut: LogControllerDecorator
  controller?: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise((resolve) => { resolve(successRequest(httpRequest.body)) })
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      await new Promise((resolve) => { resolve(null) })
    }
  }
  return new LogErrorRepositoryStub()
}
const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return { sut, controller: controllerStub, logErrorRepositoryStub }
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

  it('should returns the same result of the controller', async () => {
    const { sut, controller } = makeSut()

    jest.spyOn(controller, 'handle').mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          statusCode: 200,
          body: {
            name: 'John Doe'
          }
        })
      })
    })

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'valid_email@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'John Doe'
      }
    })
  })

  it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controller, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    const error = serverError(fakeError)

    jest.spyOn(controller, 'handle').mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve(error)
      })
    })

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'valid_email@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      }
    }

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')

    await sut.handle(httpRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
