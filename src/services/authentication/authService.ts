import AuthRepository from './authRepository'
import {
  AuthUserLocalRequestDTO,
  AuthUserLocalResponseDTO
} from './authServiceDTO'
import EmailAndPasswordNotMatchException from './errors/EmailAndPasswordNotMatchException'

export default class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async authUserLocal(
    authUserLocalRequestDTO: AuthUserLocalRequestDTO
  ): Promise<AuthUserLocalResponseDTO> {
    const user = await this.authRepository.getUserByEmail(
      authUserLocalRequestDTO.email
    )
    const passwordMatched = await user.comparePassword(
      authUserLocalRequestDTO.password
    )
    if (!passwordMatched) {
      throw new EmailAndPasswordNotMatchException()
    }
    return user.generateAccessToken()
  }
}
