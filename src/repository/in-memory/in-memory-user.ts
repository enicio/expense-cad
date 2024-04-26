import {
  UserRepository,
  createUserProps,
  createUserOutputProps,
} from '../user-repository'
import { v4 as uuidv4 } from 'uuid'

let users: createUserProps[] = []
export class InMemoryUserRepository implements UserRepository {
  async findUserByEmail(email: string): Promise<createUserProps | null> {
    const user = users.find((user) => user.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async findUserById(userId: string): Promise<createUserProps | null> {
    const user = users.find((user) => user.id === userId)
    if (!user) {
      return null
    }
    return user
  }

  async createUser({
    id = uuidv4(),
    name,
    email,
    password,
  }: createUserProps): Promise<createUserOutputProps> {
    const user = {
      id,
      name,
      email,
      password,
    }
    users.push(user)

    const userOutput = {
      id,
      name,
      email,
      password,
    }

    return userOutput
  }

  async clearDatabase() {
    users = []
  }
}
