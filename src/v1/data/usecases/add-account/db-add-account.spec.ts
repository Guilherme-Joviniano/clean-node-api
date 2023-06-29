import { type Account, type AddAccountSchema, type AddAccountRepository, type Crypter } from './db-add-account.protocol'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  crypterStub: Crypter
  addAccountRepository: AddAccountRepository
}

describe('DbAddAccount UseCase', () => {
  const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
      async add (account: AddAccountSchema): Promise<Account> {
        return { ...account, id: 'valid_id' }
      }
    }
    return new AddAccountRepositoryStub()
  }

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
    const addAccountRepository = makeAddAccountRepository()
    const sut = new DbAddAccount(crypterStub, addAccountRepository)

    return {
      sut,
      crypterStub,
      addAccountRepository
    }
  }

  it('should call the crypter with correct password', async () => {
    const { sut, crypterStub } = makeSut()

    const mock = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    const crypterSpy = jest.spyOn(crypterStub, 'encrypt')

    await sut.execute(mock)

    expect(crypterSpy).toHaveBeenCalledWith('valid_password')
  })

  it('should throw if Crypter throws', async () => {
    const { crypterStub, sut } = makeSut()

    jest.spyOn(crypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))

    const mock = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    const promise = sut.execute(mock)

    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepository } = makeSut()

    const addAccountRepositorySpy = jest.spyOn(addAccountRepository, 'add')

    const mock = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    await sut.execute(mock)

    expect(addAccountRepositorySpy).toHaveBeenCalledWith(
      expect.objectContaining({ ...mock })
    )
  })

  it('should returns a Account with passed correct values', async () => {
    const { sut } = makeSut()

    const mock = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    const account = await sut.execute(mock)

    expect(account).toEqual({
      ...mock,
      id: 'valid_id'
    })
  })
})
