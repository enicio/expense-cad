import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticateService } from '../../services/authenticate-service'
import { z } from 'zod'
import { InMemoryUserRepository } from '../../repository/in-memory/in-memory-user'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const userRepository = new InMemoryUserRepository()
  const authenticateService = new AuthenticateService(userRepository)

  try {
    const { user } = await authenticateService.authenticate({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error: any) {
    return reply.status(40).send({ message: error.message })
  }
}
