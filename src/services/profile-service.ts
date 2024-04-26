import { UserRepository } from '../repository/user-repository'

export class ProfileService {
  constructor(private userRepository: UserRepository) {}

  async checkProfile({ userId }: any) {
    const user = await this.userRepository.findUserById(userId)

    if (!user) {
      throw new Error('Resource not found.')
    }

    return { user }
  }
}
