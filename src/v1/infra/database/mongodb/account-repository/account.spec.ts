import { AccountRepository } from './account'
import { type AddAccountSchema } from './account.protocol'
import { MongoHelper } from '../helpers/mongo.helper'
interface SutTypes {
  sut: AccountRepository
}

describe('Account MongoDB Repository', () => {
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

  afterAll(async () => { await MongoHelper.disconnect() })

  const mock: AddAccountSchema = {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'hash_password'
  }
  const makeSut = (): SutTypes => {
    const accountMongoRepository = new AccountRepository()
    return {
      sut: accountMongoRepository
    }
  }

  it('should return an account on success', async () => {
    const { sut } = makeSut()

    const account = await sut.add(mock)

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(mock.name)
    expect(account.email).toBe(mock.email)
    expect(account.password).toBe(mock.password)
  })
})
