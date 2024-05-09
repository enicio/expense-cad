import { describe, expect, test } from '@jest/globals'

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

    const expenseRepository = new InMemoryExpenseRepository()
    const expenseService = new ExpenseService(expenseRepository, userRepository)

    const { expense } = await expenseService.createExpense(expense_1)

    expect(expense).toHaveProperty('amount', 1000)
    expect(expense).toHaveProperty('id')
  })
})
