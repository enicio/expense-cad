import { describe, expect, it, beforeEach } from '@jest/globals'
import { InMemoryUserRepository } from '../repository/in-memory/in-memory-user'
import { hash } from 'bcryptjs'
import { ProfileService } from './profile-service'

describe('Profile Service', () => {
  beforeEach(() => {
    const userRepository = new InMemoryUserRepository()
    userRepository.clearDatabase()
  })

  it('should check profile user', async () => {
    const userRepository = new InMemoryUserRepository()
    const profileService = new ProfileService(userRepository)

    const hashedPassword = await hash('123456', 6)

    await userRepository.createUser({
      id: '1',
      name: 'Mathilda',
      email: 'mathilda@chata.com',
      password: hashedPassword,
    })

    const response = await profileService.checkProfile({
      userId: '1',
    })

    expect(response).toEqual({
      user: {
        id: '1',
        name: 'Mathilda',
        email: 'mathilda@chata.com',
        password: hashedPassword,
      },
    })
  })

  it('should throw error if user not exist', async () => {
    const userRepository = new InMemoryUserRepository()
    const profileService = new ProfileService(userRepository)

    expect(async () => {
      await profileService.checkProfile({
        userId: '1',
      })
    }).rejects.toThrowError('Resource not found.')
  })
})
