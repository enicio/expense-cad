import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InMemoryExpenseRepository } from '../../repository/in-memory/in-memory-expense'
import { ExpenseService } from '../../services/expenses-service'

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

  const inMemoryExpenseRepository = new InMemoryExpenseRepository()
  const expenseService = new ExpenseService(inMemoryExpenseRepository)

  const data = await expenseService.createExpense({
    description,
    date,
    amount,
    userId: request.user.sub,
  })

  return reply.status(201).send(data)
}

export async function getExpense(request: FastifyRequest, reply: FastifyReply) {
  const inMemoryExpenseRepository = new InMemoryExpenseRepository()
  const expenseService = new ExpenseService(inMemoryExpenseRepository)

  try {
    const data = await expenseService.getExpense(request.user.sub)
    return reply.status(200).send(data)
  } catch (error: any) {
    return reply.status(400).send({ message: error.message })
  }
}
