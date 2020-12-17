import 'config/dotenv'
import supertest from 'supertest'
import faker from 'faker'
import jwt from 'jsonwebtoken'
import app from 'app'
import { connect, disconnect } from 'config/mongo'
import { UserModel } from 'models/user/userModel'

const request = () => supertest(app)

describe('testing user routes', () => {
  beforeAll(async () => await connect())
  afterAll(async () => await disconnect())
  beforeEach(async () => {
    await UserModel.deleteMany({})
  })

  test('should create a new user. POST -> /users', async () => {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const { status, body, type } = await request()
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')

    const decrypted = jwt.verify(body.accessToken, process.env.APP_SECRET)

    expect(type).toBe('application/json')
    expect(status).toBe(200)
    expect(decrypted).not.toBeFalsy()
  })
})
