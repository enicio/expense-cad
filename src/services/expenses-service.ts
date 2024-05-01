import { queueEmail } from '../lib/bull-queue'
import { sendEmail } from '../lib/send-email'
import {
  ExpenseRepository,
  expenseProps,
} from '../repository/expense-repository'
import { UserRepository } from '../repository/user-repository'

import { Queue } from 'bullmq'

const REDIS_HOST = '0.0.0.0'
const REDIS_PORT = 6379
const QUEUE_NAME = 'foo'

const newQueue = new Queue(QUEUE_NAME, {
  connection: {
    host: REDIS_HOST,
    port: REDIS_PORT
  },
})

export class ExpenseService {
  constructor(
    private expenseRepository: ExpenseRepository,
    private userRepository: UserRepository,
    private myQueue = newQueue
  ) {}

  async createExpense(data: expenseProps) {
    const user = await this.userRepository.findUserById(data.userId)
    const expense = await this.expenseRepository.createExpense(data)

    if (!user) {
      throw new Error('User not found')
    }
    try {
      // Enfileirando envio de email
      queueEmail(expense, user, this.myQueue, sendEmail)
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
