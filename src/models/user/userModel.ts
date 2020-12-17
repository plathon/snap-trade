import { model } from 'mongoose'
import { UserDocument } from './userTypes'
import UserSchema from './userSchema'

export const UserModel = model<UserDocument>('user', UserSchema)
