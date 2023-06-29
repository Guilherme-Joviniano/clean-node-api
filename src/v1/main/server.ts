import { MongoHelper } from '../infra/database/mongodb/helpers/mongo.helper'
import app from './configs/app'
import env from './env'

async function main (): Promise<void> {
  await MongoHelper.connect(env.mongoUrl)
  app.listen({
    port: env.port
  })
}

main().then(() => { console.log('Running on port 3333') }).catch((err) => { console.log(err) })
