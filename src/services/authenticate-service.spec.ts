import { AuthenticateService } from './authenticate-service'
import { describe, expect, it, beforeEach } from '@jest/globals'
import { InMemoryUserRepository } from '../repository/in-memory/in-memory-user'
import { hash } from 'bcryptjs'

describe('AuthenticateService', () => {
  beforeEach(() => {
    const userRepository = new InMemoryUserRepository()
    userRepository.clearDatabase()
  })

  it('should authenticate user', async () => {
    const userRepository = new InMemoryUserRepository()
    const authenticateService = new AuthenticateService(userRepository)

    const hashedPassword = await hash('123456', 6)

    await userRepository.createUser({
      id: '1',
      name: 'Mathilda',
      email: 'mathilda@chata.com',
      password: hashedPassword,
    })

    const response = await authenticateService.authenticate({
      email: 'mathilda@chata.com',
      password: '123456',
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
    const authenticateService = new AuthenticateService(userRepository)

    expect(async () => {
      await authenticateService.authenticate({
        email: 'mathilda@chata.com',
        password: 'password',
      })
    }).rejects.toThrowError('User not found')
  })

  it('should throw error if password is incorrect', async () => {
    const userRepository = new InMemoryUserRepository()
    const authenticateService = new AuthenticateService(userRepository)

    await userRepository.createUser({
      id: '1',
      name: 'Mathilda',
      email: 'mathilda@chata.com',
      password: '123456',
    })

    expect(async () => {
      await authenticateService.authenticate({
        email: 'mathilda@chata.com',
        password: '123456',
      })
    }).rejects.toThrowError('Invalid password')
  })
})
