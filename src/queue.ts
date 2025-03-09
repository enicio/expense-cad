import { Queue } from 'bullmq'

const REDIS_HOST = '0.0.0.0'
const REDIS_PORT = 6379
const QUEUE_NAME = 'foo'

export const newQueue = new Queue(QUEUE_NAME, {
  connection: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
})

export async function addJobToQueue(jobName: string, data: any, myQueue: any) {
  return myQueue.add(jobName, data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  })
}
