import { NextFunction, Request, Response } from 'express'
import AuthService from './authService'

export default class AuthController {
  constructor(private authService: AuthService) {}

  authUserLocal = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const body = request.body
    try {
      const result = await this.authService.authUserLocal(body)
      response.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}
