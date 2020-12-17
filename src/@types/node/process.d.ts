declare module 'process' {
  global {
    namespace NodeJS {
      export interface ProcessEnv {
        APP_SECRET: string
        MONGO_URI: string
      }
    }
  }
}
