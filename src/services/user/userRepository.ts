// import { IUserModel } from 'models/user/userTypes'
import { CreateUserRequestDTO } from './userServiceDTO'
import { UserModel } from 'models/user/userModel'
import { UserDocument } from 'models/user/userTypes'

import UserAlreadyExistsException from './errors/userAlreadyExistsException'

export default class UserRepository {
  async createUser(
    createUserRequest: CreateUserRequestDTO
  ): Promise<UserDocument> {
    const user = new UserModel(createUserRequest)
    try {
      const result = await user.save()
      return result
    } catch (error) {
      if (error.code === 11000) {
        throw new UserAlreadyExistsException()
      }
      throw new Error(error)
    }
  }
}
