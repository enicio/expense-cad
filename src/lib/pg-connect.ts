import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: 'squall',
  host: '0.0.0.0',
  database: 'expenses-db',
  password: '123456',
  port: 5432,
})

export { pool }
