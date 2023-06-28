import { EmailValidatorAdapter } from './email-validator.adapter'
import validator from 'validator'

interface SutTypes {
  sut: EmailValidatorAdapter
}

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  const makeSut = (): SutTypes => {
    const sut = new EmailValidatorAdapter()
    return {
      sut
    }
  }

  it('should returns false if validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(false)
  })

  it('should returns true if validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    const { sut } = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid('valid_email@email.com')

    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@email.com')
  })
})
