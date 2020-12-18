import 'config/dotenv'
import supertest from 'supertest'
import faker from 'faker'
import jwt from 'jsonwebtoken'
import app from 'app'
import { Postgres } from 'config/typeorm'
import { MigrationExecutor } from 'typeorm'

const request = () => supertest(app)

describe('testing user routes', () => {
  beforeAll(async () => await Postgres.openConnection())
  afterAll(async () => await Postgres.closeConnection())
  beforeEach(async () => (await Postgres.getConnection()).runMigrations())
  afterEach(async () => {
    const connection = await Postgres.getConnection()
    const migrationExecutor = new MigrationExecutor(connection)
    const migrations = await migrationExecutor.getAllMigrations()
    const migrationsLength = migrations.length
    for (let i = 0; i < migrationsLength; i++) {
      await migrationExecutor.undoLastMigration()
    }
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
