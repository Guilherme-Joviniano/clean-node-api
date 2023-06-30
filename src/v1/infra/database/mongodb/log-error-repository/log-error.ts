import { MongoHelper } from '../helpers/mongo.helper'
import { type LogErrorRepository as ILogErrorRepository } from './log-error.protocol'

export class LogErrorRepository implements ILogErrorRepository {
  async log (stack: string): Promise<void> {
    const errorsCollection = await MongoHelper.getCollection('errors')
    await errorsCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
