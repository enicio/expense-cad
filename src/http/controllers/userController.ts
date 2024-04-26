import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateUserService } from '../../services/create-user-service'
import { InMemoryUserRepository } from '../../repository/in-memory/in-memory-user'
import { z } from 'zod'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(32),
  })
  const { name, email, password } = schema.parse(request.body)

  const userRepository = new InMemoryUserRepository()
  const createUserService = new CreateUserService(userRepository)
  try {
    const user = await createUserService.createUser({ name, email, password })
    return reply.send(user)
  } catch (error: any) {
    return reply.status(400).send({ message: error.message })
  }
}
