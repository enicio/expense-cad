import { sendEmail } from '../lib/send-email'
import {
  ExpenseRepository,
  expenseProps,
} from '../repository/expense-repository'
import { UserRepository } from '../repository/user-repository'

export class ExpenseService {
  constructor(
    private expenseRepository: ExpenseRepository,
    private userRepository: UserRepository,
  ) {}

  async createExpense(data: expenseProps) {
    const user = await this.userRepository.findUserById(data.userId)
    const expense = await this.expenseRepository.createExpense(data)

    if (!user) {
      throw new Error('User not found')
    }
    try {
      await sendEmail(expense, user)
    } catch (error: any) {
      console.error(error.message)
    }
    // Simulando envio de email - observar resultado no console
    return { expense }
  }

  async getExpense(id: string) {
    const expenses = await this.expenseRepository.getExpense(id)
    return { expenses }
  }
}
