import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  Unique
} from 'typeorm'

import Bcrypt from 'providers/Bcrypt'
import { CreateUserResponseDTO } from 'services/user/userServiceDTO'
import Jwt from 'providers/Jwt'

@Entity()
@Unique(['email'])
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, length: 150 })
  name: string

  @Column({ nullable: false, length: 150 })
  email: string

  @Column({ nullable: false, length: 150 })
  password: string

  private tempPassword: string

  @BeforeUpdate()
  @BeforeInsert()
  async HashPassword() {
    if (this.tempPassword !== this.password) {
      const bcrypt = new Bcrypt()
      const salt = await bcrypt.genSalt()
      const password = this.password
      const passwordHash = await bcrypt.hash(password, salt)
      this.password = passwordHash
    }
  }

  @AfterLoad()
  loadTempPassword() {
    this.tempPassword = this.password
  }

  generateAccessToken(): CreateUserResponseDTO {
    const jwt = new Jwt()
    const user = { id: this.id, name: this.name, email: this.email }
    const token = { accessToken: jwt.sign(user, process.env.APP_SECRET) }
    return token
  }

  async comparePassword(password: string): Promise<boolean> {
    const bcrypt = new Bcrypt()
    return await bcrypt.compare(password, this.password)
  }
}
