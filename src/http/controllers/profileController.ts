import { FastifyRequest, FastifyReply } from 'fastify'
import { InMemoryUserRepository } from '../../repository/in-memory/in-memory-user'
import { ProfileService } from '../../services/profile-service'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userRepository = new InMemoryUserRepository()
  const profileService = new ProfileService(userRepository)

  const { user } = await profileService.checkProfile({
    userId: request.user.sub,
  })

  return reply.status(200).send({ user: { ...user, password: undefined } })
}
