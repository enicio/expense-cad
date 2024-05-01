import { Worker } from 'bullmq'


  export async function queueEmail(expense: any, user: any, myQueue: any, sendEmail: any) {
    await myQueue.add(
        "send-email",
        { expense, user },
        {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
        },
      )

      const worker = new Worker(
        "foo",
        async (job) => {
          const { expense, user } = job.data
          await sendEmail(expense, user)
        },
        {
          connection: {
            host: '0.0.0.0',
            port: 6379,
          },
        },
      )

      worker.on('completed', (job) => {
        console.log(`${job.id} has completed!`)
      })

      worker.on('failed', (job, err) => {
        console.log(`${job?.id} has failed with ${err.message}`)
      })
  }
