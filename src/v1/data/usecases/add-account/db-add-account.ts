
import { type DbAddUseCase, type Crypter, type AddAccountSchema, type Account, type AddAccountRepository } from './db-add-account.protocol'

export class DbAddAccount implements DbAddUseCase {
  private readonly crypter: Crypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (crypter: Crypter, addAccountRepository: AddAccountRepository) {
    this.crypter = crypter
    this.addAccountRepository = addAccountRepository
  }

  async execute (accountData: AddAccountSchema): Promise<Account> {
    const hashedPassword = await this.crypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.execute(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
