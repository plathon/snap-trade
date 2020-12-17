import { NextFunction, Request, Response } from 'express'
import UserService from './userService'

export default class UserController {
  constructor(private userService: UserService) {}

  createUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const body = request.body
    try {
      const result = await this.userService.createUser(body)
      response.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}
