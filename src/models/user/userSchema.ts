import { Schema } from 'mongoose'
import { UserDocument } from './userTypes'
import Bcrypt from 'providers/Bcrypt'
import Jwt from 'providers/Jwt'

const userSchema = new Schema<UserDocument>({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
})

userSchema.pre<UserDocument>('save', async function (next): Promise<void> {
  if (!this.password || !this.isModified('password')) return next()
  try {
    const bcrypt = new Bcrypt()
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
  } catch (error) {
    throw new Error(error)
  }
})

userSchema.methods.generateAccessToken = function () {
  const user = { _id: this._id, name: this.name, email: this.email }
  const secret = process.env.APP_SECRET
  const jwt = new Jwt()
  return { accessToken: jwt.sign(user, secret) }
}

userSchema.methods.comparePassword = async function (password) {
  const bcrypt = new Bcrypt()
  return await bcrypt.compare(password, this.password)
}

export default userSchema
