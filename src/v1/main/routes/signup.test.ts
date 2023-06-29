import request from 'supertest'
import app from '../configs/app'
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongo.helper'

describe('Route for SignUp', () => {
  beforeAll(async () => { await MongoHelper.connect(process.env.MONGO_URL) })

  afterAll(async () => { await MongoHelper.disconnect() })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('should returns an account when success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Guilherme',
        email: '00drpixelss@gmail.com',
        password: 'fdsa302010',
        passwordConfirmation: 'fdsa302010'
      })
      .expect(200)
  })
})
