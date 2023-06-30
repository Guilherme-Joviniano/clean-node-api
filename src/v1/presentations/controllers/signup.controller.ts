
import { type HttpRequest, type HttpResponse, type Controller, type EmailValidator, type AddAccount } from './sign.up.protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError, successRequest } from '../helpers/http.helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, password, passwordConfirmation, email } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.execute({
        name,
        email,
        password
      })

      return successRequest(account)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        return serverError(error)
      }
    }
  }
}
