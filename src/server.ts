import 'config/dotenv'
import app from './app'
import { connect } from './config/mongo'

connect()

const port = 3000
const host = '0.0.0.0'

app.listen(port, host)
