import { CreateUserRequestDTO, CreateUserResponseDTO } from './userServiceDTO'
import UserRepository from './userRepository'

export default class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(
    createUserRequest: CreateUserRequestDTO
  ): Promise<CreateUserResponseDTO> {
    const result = await this.userRepository.createUser(createUserRequest)
    const jwt = result.generateAccessToken()
    return jwt
  }
}
