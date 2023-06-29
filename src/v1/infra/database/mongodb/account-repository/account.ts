import { MongoHelper } from '../helpers/mongo.helper'
import { type Account, type AddAccountRepository, type AddAccountSchema } from './account.protocol'

export class AccountRepository implements AddAccountRepository {
  async add (accountData: AddAccountSchema): Promise<Account> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const { _id, ...accountWithoutId } = await accountCollection.findOne({ _id: insertedId })
    const account = Object.assign({}, accountWithoutId, { id: _id.toHexString() }) as Account

    return account
  }
}
