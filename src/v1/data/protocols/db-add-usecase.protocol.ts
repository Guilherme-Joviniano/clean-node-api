import { type Account } from '../../domain/entities'
import { type AddAccountSchema } from '../../domain/schemas'

export interface DbAddUseCase {
  execute: (data: AddAccountSchema) => Promise<Account>
}
