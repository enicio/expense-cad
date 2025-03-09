import { FastifyInstance } from 'fastify'
import { createUser, getUser } from './controllers/userController'
import { authenticate } from './controllers/authController'
import { profile } from './controllers/profileController'
import { verifyJWT } from './middlewares/verify-jwt'
import { createExpense, getExpense } from './controllers/expensesController'

export async function routes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/users/authenticate', authenticate)
  app.get('/users/:id', { onRequest: [verifyJWT] }, getUser)

  app.post('/expense', { onRequest: [verifyJWT] }, createExpense)
  app.get('/expense', { onRequest: [verifyJWT] }, getExpense)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
