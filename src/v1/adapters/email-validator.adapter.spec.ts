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
})
