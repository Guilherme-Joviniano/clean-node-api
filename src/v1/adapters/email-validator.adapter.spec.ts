import { EmailValidatorAdapter } from './email-validator.adapter'
interface SutTypes {
  sut: EmailValidatorAdapter
}

describe('EmailValidator Adapter', () => {
  const makeSut = (): SutTypes => {
    const sut = new EmailValidatorAdapter()
    return {
      sut
    }
  }

  it('should returns false if validator returns false', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('invalid_email@gmail.com')
    expect(isValid).toBe(false)
  })
})