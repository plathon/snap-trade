import AuthRepository from './authRepository'
import AuthService from './authService'
import AuthController from './authController'

const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

export default authController
