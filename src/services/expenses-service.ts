import { queueEmail } from '../lib/bull-queue'
import {
  ExpenseRepository,
  expenseProps,
} from '../repository/expense-repository'
import { UserRepository } from '../repository/user-repository'

import { newQueue } from '../queue'

export class ExpenseService {
  constructor(
    private expenseRepository: ExpenseRepository,
    private userRepository: UserRepository,
  ) {}

  async createExpense(data: expenseProps) {
    const user = await this.userRepository.findUserById(data.userId)

    if (!user) {
      throw new Error('User not found')
    }

    const expense = await this.expenseRepository.createExpense(data)
    try {
      // Enfileirando envio de email
      queueEmail(expense, user, newQueue)
    } catch (error: any) {
      console.error('Error send email', error.message)
    }
    return { expense }
  }

  async getExpense(id: string) {
    const expenses = await this.expenseRepository.getExpense(id)
    return { expenses }
  }
}
