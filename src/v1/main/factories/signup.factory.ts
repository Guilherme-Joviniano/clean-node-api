import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/ctyptography/bcrypt.adapter'
import { AccountMongoRepository } from '../../infra/database/mongodb/account-repository/account'
import { EmailValidatorAdapter } from '../../presentations/adapters/email-validator.adapter'
import { SignUpController } from '../../presentations/controllers/signup.controller'
import { type Controller } from '../../presentations/protocols'
import { LogControllerDecorator } from '../decorators/log-controller.decorator'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signUpController)
}
