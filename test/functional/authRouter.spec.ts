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

  test('should return not found when try to login with invalid email. POST -> /auth/local', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const { status, body, type } = await request()
      .post('/auth/local')
      .send(user)
      .set('Accept', 'application/json')

    expect(type).toBe('application/json')
    expect(status).toBe(404)
    expect(body.message).toBe('User Not Found')
  })

  test('should return forbidden when email and password not match. POST -> /auth/local', async () => {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const userModel = new UserModel(user)
    await userModel.save()

    const userWrongPassword = {
      email: user.email,
      password: 'wrong_password'
    }

    const { status, body, type } = await request()
      .post('/auth/local')
      .send(userWrongPassword)
      .set('Accept', 'application/json')

    expect(status).toBe(403)
    expect(type).toBe('application/json')
    expect(body.message).toBe('Email and password not match')
  })

  test('should successfully login when valid credentials are provided', async () => {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    const userModel = new UserModel(user)
    await userModel.save()

    const validCredentials = {
      email: user.email,
      password: user.password
    }

    const { status, body, type } = await request()
      .post('/auth/local')
      .send(validCredentials)
      .set('Accept', 'application/json')

    const decrypted = jwt.verify(body.accessToken, process.env.APP_SECRET)

    expect(status).toBe(200)
    expect(type).toBe('application/json')
    expect(decrypted).toBeTruthy()
  })
})
