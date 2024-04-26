export interface createUserProps {
  id?: string
  name: string
  email: string
  password: string
}

export interface createUserOutputProps {
  id?: string
  name: string
  email: string
  password: string
}

export interface UserRepository {
  findUserById(id: string): Promise<createUserProps | null>
  createUser(data: createUserProps): Promise<createUserOutputProps>
  findUserByEmail(email: string): Promise<createUserProps | null>
}
