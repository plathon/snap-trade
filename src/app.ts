import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'

import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './schema.json'

import ErrorHandler from './errors/ErrorHandler'

import routes from './routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(routes)

const errorhandler = new ErrorHandler()
app.use(errorhandler.handle)

export default app
