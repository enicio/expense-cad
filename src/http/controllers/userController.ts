import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateUserService } from '../../services/create-user-service'
// import { InMemoryUserRepository } from '../../repository/in-memory/in-memory-user'
import { PgUsersRepository } from '../../repository/postgre-db/pg-users'
import { z } from 'zod'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(32),
  })
  const { name, email, password } = schema.parse(request.body)

  // const userRepository = new InMemoryUserRepository()
  const userRepository = new PgUsersRepository()
  const createUserService = new CreateUserService(userRepository)
  try {
    const { user } = await createUserService.createUser({
      name,
      email,
      password,
    })
    return reply.status(201).send({ user: { ...user, password: undefined } })
  } catch (error: any) {
    return reply.status(400).send({ message: error.message })
  }
}

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    id: z.string(),
  })
  const { id } = schema.parse(request.params)

  // const userRepository = new InMemoryUserRepository()
  const userRepository = new PgUsersRepository()
  const user = await userRepository.findUserById(id)
  return reply.status(200).send({ user: { ...user, password: undefined } })
}
