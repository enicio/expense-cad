import { FastifyRequest, FastifyReply } from 'fastify'
import { ProfileService } from '../../services/profile-service'
import { PgUsersRepository } from '../../repository/postgre-db/pg-users'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userRepository = new PgUsersRepository()
  const profileService = new ProfileService(userRepository)

  const { user } = await profileService.checkProfile({
    userId: request.user.sub,
  })

  return reply.status(200).send({ user: { ...user, password: undefined } })
}
