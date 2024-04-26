import { ExpenseRepository, expenseProps } from '../expense-repository'
import { v4 as uuidv4 } from 'uuid'

let expenses: expenseProps[] = []
export class InMemoryExpenseRepository implements ExpenseRepository {
  async findUserById(id: string): Promise<expenseProps | null> {
    const expense = expenses.find((expense) => expense.id === id)
    if (!expense) {
      return null
    }
    return expense
  }

  async createExpense({
    id = uuidv4(),
    amount,
    date,
    description,
    userId,
  }: expenseProps): Promise<expenseProps> {
    const expense = {
      id,
      amount,
      date,
      description,
      userId,
    }
    expenses.push(expense)
    return expense
  }

  async getExpense(userId: string): Promise<expenseProps[]> {
    const expense = expenses.filter((expense) => expense.userId === userId)
    if (!expense) {
      throw new Error('Expense not found')
    }
    return expense
  }

  clearDatabase() {
    expenses = []
  }
}
