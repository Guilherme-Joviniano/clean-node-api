import { type Account } from '../../domain/entities'
import { type AddAccountSchema } from '../../domain/schemas'

export interface AddAccountRepository {
  execute: (account: AddAccountSchema) => Promise<Account>
}
