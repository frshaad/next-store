import 'server-only'
import { genSalt, hash } from 'bcryptjs'

const SALT_FACTOR = 12

export async function saltAndHashPassword(password: string): Promise<string> {
  const salt = await genSalt(SALT_FACTOR)
  const hashedPassword = await hash(password, salt)

  return hashedPassword
}
