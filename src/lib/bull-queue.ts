export async function queueEmail(expense: any, user: any, myQueue: any) {
  await myQueue.add(
    'send-email',
    { expense, user },
    {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },
  )
}
