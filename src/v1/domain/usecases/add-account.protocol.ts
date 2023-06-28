import { type Account } from '../entities'
import { type AddAccountSchema } from '../schemas'

export interface AddAccount {
  execute: (account: AddAccountSchema) => Promise<Account>
}
