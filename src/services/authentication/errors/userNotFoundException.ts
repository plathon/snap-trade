import { NotFoundException } from 'errors/NotFoundException'

export class UserNotFoundException extends NotFoundException {
  constructor(description = 'User Not Found') {
    super(description)
  }
}
