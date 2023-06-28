import { type Account } from '../../domain/entities'
import { type AddAccountSchema } from '../../domain/schemas'
import { type DbAddUseCase, type Crypter } from './db-add-account.protocol'

export class DbAddAccount implements DbAddUseCase {
  private readonly crypter: Crypter
  constructor (crypter: Crypter) {
    this.crypter = crypter
  }

  async execute (data: AddAccountSchema): Promise<Account> {
    const passwordHash = await this.crypter.encrypt(data.password)
    return {
      id: 'valid id',
      password: passwordHash,
      ...data
    }
  }
}
