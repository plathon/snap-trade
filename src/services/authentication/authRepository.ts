import { UserModel } from 'models/user/userModel'
import { UserDocument } from 'models/user/userTypes'
import { UserNotFoundException } from './errors/userNotFoundException'

export default class AuthRepository {
  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await UserModel.findOne({ email: email }).exec()
    if (!user) throw new UserNotFoundException()
    return user
  }
}
