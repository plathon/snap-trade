import { ForbiddenException } from 'errors/ForbiddenException'

export default class UserAlreadyExistsException extends ForbiddenException {
  constructor(description = 'User Already Exists') {
    super(description)
  }
}
