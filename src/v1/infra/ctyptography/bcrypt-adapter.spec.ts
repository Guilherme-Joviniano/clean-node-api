import { BcryptAdapter } from './bcrypt.adapter'
import bcrypt from 'bcrypt'

interface SutTypes {
  sut: BcryptAdapter
}

jest.mock('bcrypt', () => ({
  async hash (value: string): Promise<string> {
    return await new Promise((resolve) => { resolve('any_value_hashed') })
  }
}))

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

  it('should returns a hash on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('any_value_hashed')
  })

  it('should throws if Bcrypt throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt('any_value')

    await expect(promise).rejects.toThrow()
  })
})
