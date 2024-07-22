import { describe, expect, test, jest } from '@jest/globals'

import { ExpenseService } from './expenses-service'
import { InMemoryExpenseRepository } from '../repository/in-memory/in-memory-expense'
import { InMemoryUserRepository } from '../repository/in-memory/in-memory-user'

describe('ExpensesService', () => {
  test('Create a expense', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const userRepository = new InMemoryUserRepository()
    inMemoryUserRepository.createUser({
      id: '123',
      name: 'John Doe',
      email: 'teste@test.com',
      password: '123456',
    })
    const expense_1 = {
      id: '1',
      userId: '123',
      amount: 1000,
      description: 'compra da kombi',
      date: '2021-10-10',
    }
    const queueEmail = jest.fn()
    queueEmail.mockReturnValue('Email sent')

    const newQueue = jest.fn()
    newQueue.mockReturnValue('Queue created')

    const expenseRepository = new InMemoryExpenseRepository()
    const expenseService = new ExpenseService(
      expenseRepository,
      userRepository,
      queueEmail,
      newQueue,
    )

    const { expenseData } = await expenseService.createExpense(expense_1)

    expect(expenseData).toHaveProperty('amount', 1000)
    expect(expenseData).toHaveProperty('id')
  })
})
