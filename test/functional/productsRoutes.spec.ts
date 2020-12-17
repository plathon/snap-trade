import '../../src/config/dotenv'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import faker from 'faker'
import app from '../../src/app'
import { connect, disconnect } from '../../src/config/mongo'
import { ProductModel } from '../../src/models/product/productModel'

const request = () => supertest(app)

describe('testing products routes', () => {
  beforeAll(async () => await connect())
  afterAll(async () => await disconnect())
  beforeEach(async () => {
    await ProductModel.deleteMany({})
  })

  test('list products. GET -> /products', async () => {
    const products = [
      {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription()
      },
      {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription()
      }
    ]

    await Promise.all(
      products.map(async productItem => {
        const product = new ProductModel(productItem)
        return await product.save()
      })
    )

    const { status, body, type } = await request()
      .get('/products')
      .set('Accept', 'application/json')

    expect(status).toBe(200)
    expect(type).toBe('application/json')
    expect(body.length).toBe(2)
  })

  test('create a new product. POST -> /product', async () => {
    const product = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription()
    }

    const user = {
      _id: faker.random.uuid,
      name: faker.name.findName,
      email: faker.internet.email
    }

    const token = jwt.sign(user, process.env.APP_SECRET)

    let products = await ProductModel.find().exec()
    expect(products.length).toBe(0)

    const { status, body, type } = await request()
      .post('/product')
      .send(product)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(type).toBe('application/json')
    expect(body.name).toBe(product.name)
    expect(body.description).toBe(product.description)

    products = await ProductModel.find().exec()
    expect(products.length).toBe(1)
  })
})
