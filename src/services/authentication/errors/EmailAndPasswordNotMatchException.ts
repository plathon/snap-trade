import { ForbiddenException } from 'errors/ForbiddenException'

export default class EmailAndPasswordNotMatchException extends ForbiddenException {
  constructor(description = 'Email and password not match') {
    super(description)
  }
}
