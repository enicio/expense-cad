import { UserRepository, createUserProps } from '../repository/user-repository'
import { hash } from 'bcryptjs'

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}
  async createUser({ id, name, email, password }: createUserProps) {
    const hashedPassword = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findUserByEmail(email)

    if (userWithSameEmail) {
      throw new Error('User already exists')
    }

    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    })

    return { user }
  }
}
