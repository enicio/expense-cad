import { queueEmail } from '../lib/bull-queue'
import { sendEmail } from '../lib/send-email'
import {
  ExpenseRepository,
  expenseProps,
} from '../repository/expense-repository'
import { UserRepository } from '../repository/user-repository'

import { Worker } from 'bullmq'
import { newQueue } from '../queue'

const REDIS_HOST = '0.0.0.0'
const REDIS_PORT = 6379

const worker = new Worker(
  'foo',
  async (job) => {
    const { expense, user } = job.data
    await sendEmail(expense, user)
  },
  {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT,
    },
  },
)

worker.on('completed', (job: any) => {
  console.log(`${job.id} has completed!`)
})

worker.on('active', (job: any) => {
  console.log(`${job.id} has started!`)
})

worker.on('failed', (job: any, err: any) => {
  console.log(`${job?.id} has failed with ${err.message}`)
})

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
      console.error(error.message)
    }
    return { expense }
  }

  async getExpense(id: string) {
    const expenses = await this.expenseRepository.getExpense(id)
    return { expenses }
  }
}
