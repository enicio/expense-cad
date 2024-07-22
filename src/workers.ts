import { Worker } from 'bullmq'
import { sendEmail } from './lib/send-email'

const jobProcessor = async (job: any) => {
  const { expense, user } = job.data
  await sendEmail(expense, user)
}

export function setupWorkers() {
  const REDIS_HOST = '0.0.0.0'
  const REDIS_PORT = 6379
  const QUEUE_NAME = 'foo'

  const worker = new Worker(QUEUE_NAME, jobProcessor, {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT,
    },
  })

  worker.on('completed', (job: any) => {
    console.log(`${job.id} has completed!`)
  })

  worker.on('active', (job: any) => {
    console.log(`${job.id} has started!`)
  })

  worker.on('failed', (job: any, err: any) => {
    console.log(`${job?.id} has failed with ${err.message}`)
  })
}
