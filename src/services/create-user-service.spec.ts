import { InMemoryUserRepository } from '../repository/in-memory/in-memory-user'
import { CreateUserService } from './create-user-service'
import { compare } from 'bcryptjs'
import { describe, expect, it, beforeEach } from '@jest/globals'

describe('CreateUserService', () => {
  beforeEach(() => {
    const userRepository = new InMemoryUserRepository()
    userRepository.clearDatabase()
  })
  it('should hash user password', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(userRepository)

    const { user } = await createUserService.createUser({
      id: '2',
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    })

    const isPasswordCorrect = await compare('123456', user.password)

    expect(isPasswordCorrect).toBe(true)
  })

  it('should not create user with same email', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(userRepository)

    await createUserService.createUser({
      id: '2',
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    })

    expect(async () => {
      await createUserService.createUser({
        id: '4',
        name: 'John Doe',
        email: 'john@email.com',
        password: '123456',
      })
    }).rejects.toThrowError('User already exists')
  })
})
