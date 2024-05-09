import {
  UserRepository,
  createUserOutputProps,
  createUserProps,
} from '../user-repository'
import { pool } from '../../lib/pg-connect'

export class PgUsersRepository implements UserRepository {
  async findUserByEmail(email: string): Promise<createUserProps | null> {
    // Implementar lógica para buscar usuário por email
    console.log('Find by email', email)
    const text = 'SELECT * FROM users_3 WHERE email = $1'
    const values = [email]
    const userdb = await pool.query(text, values)
    if (userdb.rows.length === 0) {
      return null
    }

    return userdb.rows[0]
  }

  async findUserById(userId: string): Promise<createUserProps | null> {
    // Implementar lógica para buscar usuário por id
    const text = 'SELECT * FROM users_3 WHERE id = $1'
    const values = [userId]
    const userdb = await pool.query(text, values)
    return userdb.rows[0]
  }

  async createUser({
    name,
    email,
    password,
  }: createUserProps): Promise<createUserOutputProps> {
    // Implementar lógica para criar usuário
    console.log('Create user')
    const text =
      'INSERT INTO users_3(name, email, password) VALUES($1, $2, $3) RETURNING *'
    const values = [name, email, password]
    const userdb = await pool.query(text, values)
    const createUserOutput: createUserOutputProps = {
      id: userdb.rows[0].id,
      name: userdb.rows[0].name,
      email: userdb.rows[0].email,
      password: userdb.rows[0].password,
    }

    return createUserOutput
  }

  async clearDatabase() {
    // Implementar lógica para limpar a base de dados
  }
}
