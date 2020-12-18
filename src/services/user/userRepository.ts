import { Postgres } from 'config/typeorm'
import User from 'entities/User'
import { CreateUserRequestDTO } from './userServiceDTO'

import UserAlreadyExistsException from './errors/userAlreadyExistsException'

export default class UserRepository {
  async createUser(createUserRequest: CreateUserRequestDTO): Promise<User> {
    const entityManager = (await Postgres.getConnection()).manager
    const { name, email, password } = createUserRequest
    const user = new User()
    user.name = name
    user.email = email
    user.password = password

    try {
      const result = await entityManager.save(user)
      return result
    } catch (error) {
      if (error.code === '23505') {
        throw new UserAlreadyExistsException()
      }
      throw new Error(error)
    }
  }
}
