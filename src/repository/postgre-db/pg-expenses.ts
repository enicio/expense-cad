import { ExpenseRepository } from '../../repository/expense-repository'
import { pool } from '../../lib/pg-connect'

export class PgExpensesRepository implements ExpenseRepository {
  async createExpense({ userId, description, amount, date }: any) {
    const query = {
      text: 'INSERT INTO expenses(user_id, description, amount, date) VALUES($1, $2, $3, $4) RETURNING *',
      values: [userId, description, amount, date],
    }

    const { rows } = await pool.query(query)
    return rows[0]
  }

  async getExpense(userId: string) {
    const query = {
      text: 'SELECT * FROM expenses WHERE user_id = $1',
      values: [userId],
    }

    const { rows } = await pool.query(query)
    return rows
  }
}
