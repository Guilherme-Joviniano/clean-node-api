import { BcryptAdapter } from './bcrypt.adapter'
import bcrypt from 'bcrypt'

interface SutTypes {
  sut: BcryptAdapter
}

describe('Bcrypt Adapter', () => {
  const salt = 8
  const makeSut = (): SutTypes => {
    const sut = new BcryptAdapter(salt)
    return { sut }
  }

  it('should calls Bcrypt with correct values', async () => {
    const { sut } = makeSut()

    const bcryptSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(bcryptSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
