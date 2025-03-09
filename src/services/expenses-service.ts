// import { queueEmail } from '../lib/bull-queue'
import {
  ExpenseRepository,
  expenseProps,
} from '../repository/expense-repository'
import { UserRepository } from '../repository/user-repository'

// import { newQueue } from '../queue'
import { dayjs } from '../lib/dayjs'

export class ExpenseService {
  constructor(
    private expenseRepository: ExpenseRepository,
    private userRepository: UserRepository,
    private queueEmail: any,
    private newQueue: any,
  ) {}

  async createExpense(data: expenseProps) {
    const user = await this.userRepository.findUserById(data.userId)

    if (!user) {
      throw new Error('User not found')
    }

    const expense = await this.expenseRepository.createExpense(data)
    try {
      // Enfileirando envio de email
      this.queueEmail(expense, user, this.newQueue)
    } catch (error: any) {
      console.error('Error send email', error.message)
    }
    const expenseData = {
      ...expense,
      date: dayjs(expense.date).format('DD/MM/YYYY'),
    }
    return { expenseData }
  }

  async getExpense(id: string) {
    const expenses = await this.expenseRepository.getExpense(id)
    return { expenses }
  }
}
