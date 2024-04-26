export interface expenseProps {
  id?: string
  userId: string
  description: string
  amount: number
  date: string
}

export interface ExpenseRepository {
  findUserById(id: string): Promise<expenseProps | null>
  createExpense(data: expenseProps): Promise<expenseProps>
  getExpense(id: string): Promise<expenseProps[]>
}
