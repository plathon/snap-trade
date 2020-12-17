import IJwt from './IJwt'

import jwt from 'jsonwebtoken'

export default class Jwt implements IJwt {
  sign(data: { [key: string]: string }, privateKey: string): string {
    return jwt.sign(data, privateKey)
  }
}
