import { compare } from 'bcryptjs'
import { UserRepository } from '../repository/user-repository'

interface AuthenticateProps {
  email: string
  password: string
}
export class AuthenticateService {
  constructor(private UserRepository: UserRepository) {}

  async authenticate({ email, password }: AuthenticateProps) {
    const user = await this.UserRepository.findUserByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    const doesPasswordMatch = await compare(password, user.password)

    if (!doesPasswordMatch) {
      throw new Error('Invalid password')
    }

    return { user }
  }
}
