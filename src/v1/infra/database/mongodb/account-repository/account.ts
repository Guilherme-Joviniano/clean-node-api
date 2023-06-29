import { type Account, type AddAccountRepository, type AddAccountSchema } from './account.protocol'

export class AccountRepository implements AddAccountRepository {
  async execute (account: AddAccountSchema): Promise<Account> {

  }
}
