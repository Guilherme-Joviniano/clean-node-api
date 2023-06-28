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
    const sut = new DbAddAccount()
    const crypterStub = makeCrypter()
    return {
      sut,
      crypterStub
    }
  }
  it('Should call the Encrypter with correct password', () => {
    const { sut, crypterStub } = makeSut()
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    const encryptySpy = jest.spyOn(crypterStub, 'encrypt')

    sut.execute(accountData)

    expect(encryptySpy).toHaveBeenCalledWith('valid_password')
  })
})
