import 'config/dotenv'
import { Postgres } from 'config/typeorm'
;(async () => {
  await Postgres.openConnection()
  await (await Postgres.getConnection()).runMigrations()
  await Postgres.closeConnection()
})()
