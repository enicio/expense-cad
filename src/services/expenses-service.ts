import { sendEmail } from '../lib/send-email'
import {
  ExpenseRepository,
  expenseProps,
} from '../repository/expense-repository'
import { InMemoryUserRepository } from '../repository/in-memory/in-memory-user'

export class ExpenseService {
  constructor(private expenseRepository: ExpenseRepository) {}

  async createExpense(data: expenseProps) {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const user = await inMemoryUserRepository.findUserById(data.userId)
    const expense = await this.expenseRepository.createExpense(data)

    if (!user) {
      throw new Error('User not found')
    }
    // Simulando envio de email - observar resultado no console
    sendEmail(expense, user)
    return { expense }
  }

  async getExpense(id: string) {
    const expenses = await this.expenseRepository.getExpense(id)
    return { expenses }
  }
}
