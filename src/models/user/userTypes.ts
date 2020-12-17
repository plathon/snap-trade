import { Document } from 'mongoose'

export interface User {
  _id: string
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserDocument extends Omit<User, '_id'>, Document {
  generateAccessToken: () => { accessToken: string }
  comparePassword: (password: string) => Promise<boolean>
}
