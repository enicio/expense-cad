import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ExpenseService } from '../../services/expenses-service'
import { PgExpensesRepository } from '../../repository/postgre-db/pg-expenses'
import { PgUsersRepository } from '../../repository/postgre-db/pg-users'

export async function createExpense(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const expenceBodySchema = z.object({
    description: z.string().max(191),
    date: z.string().date(),
    amount: z.number().nonnegative(),
  })

  const { description, date, amount } = expenceBodySchema.parse(request.body)

  const expenseRepository = new PgExpensesRepository()
  const userRepository = new PgUsersRepository()
  const expenseService = new ExpenseService(expenseRepository, userRepository)

  const data = await expenseService.createExpense({
    description,
    date,
    amount,
    userId: request.user.sub,
  })

  return reply.status(201).send(data)
}

export async function getExpense(request: FastifyRequest, reply: FastifyReply) {
  const expenseRepository = new PgExpensesRepository()
  const userRepository = new PgUsersRepository()
  const expenseService = new ExpenseService(expenseRepository, userRepository)

  try {
    const data = await expenseService.getExpense(request.user.sub)
    return reply.status(200).send(data)
  } catch (error: any) {
    return reply.status(400).send({ message: error.message })
  }
}
