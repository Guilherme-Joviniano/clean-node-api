import { type Account } from '../../domain/entities'
import { type AddAccountSchema } from '../../domain/schemas'

export interface AddAccountRepository {
  add: (account: AddAccountSchema) => Promise<Account>
}
