import { MongoClient, type Collection } from 'mongodb'
import { type Account } from '../account-repository/account.protocol'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  async getCollection (name: string): Promise<Collection> {
    return this.client.db().collection(name)
  },
  map (account: any): Account {
    const { _id, ...accountWithoutId } = account
    return Object.assign({}, accountWithoutId, { id: _id.toHexString() }) as Account
  }
}
