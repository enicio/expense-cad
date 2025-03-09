import { addJobToQueue } from '../queue'

export async function queueEmail(expense: any, user: any, myQueue: any) {
  const job = await addJobToQueue('send-email', { expense, user }, myQueue)
  console.log(`Job ${job.id} added to queue`)
}
