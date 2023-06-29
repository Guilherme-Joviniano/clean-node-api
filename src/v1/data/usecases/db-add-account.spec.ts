import { type Crypter } from './db-add-account.protocol'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  crypterStub: Crypter
}

describe('DbAddAccount UseCase', () => {
  const makeCrypter = (): Crypter => {
    class CrypterStub implements Crypter {
      async encrypt (value: string): Promise<string> {
        return await new Promise((resolve) => { resolve(value) })
      }
    }

    return new CrypterStub()
  }
  const makeSut = (): SutTypes => {
    const crypterStub = makeCrypter()
    const sut = new DbAddAccount(crypterStub)
    return {
      sut,
      crypterStub
    }
  }

  it('Should call the crypter with correct password', async () => {
    const { sut, crypterStub } = makeSut()

    const account = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    const crypterSpy = jest.spyOn(crypterStub, 'encrypt')

    await sut.execute(account)

    expect(crypterSpy).toHaveBeenCalledWith('valid_password')
  })
})
