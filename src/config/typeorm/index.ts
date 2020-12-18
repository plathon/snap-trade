import path from 'path'
import { createConnection, Connection, ConnectionOptions } from 'typeorm'

export enum ConnectionTypes {
  default = 'default'
}

export class Postgres {
  private static connection: Connection
  private static connectionOptions: ConnectionOptions[] = [
    {
      name: ConnectionTypes.default,
      type: 'postgres',
      host: process.env.PG_HOST,
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      entities: [path.resolve(__dirname, '../../entities/*{.ts,.js}')],
      migrations: [path.resolve(__dirname, 'migrations/**/*.ts')]
    }
  ]

  private constructor() {}

  static async getConnection(
    connectionType = ConnectionTypes.default
  ): Promise<Connection> {
    await Postgres.openConnection(connectionType)
    return Postgres.connection
  }

  static async openConnection(
    connectionType = ConnectionTypes.default
  ): Promise<void> {
    if (!Postgres.connection) {
      const connection = Postgres.connectionOptions.find(
        conn => conn.name === connectionType
      )
      Postgres.connection = await createConnection(
        connection || Postgres.connectionOptions[0]
      )
    }
  }

  static async closeConnection(): Promise<void> {
    Postgres.connection.close()
  }
}
