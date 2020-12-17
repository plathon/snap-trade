import UserService from './userService'
import UserRepository from './userRepository'
import UserController from './userController'

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

export default userController
