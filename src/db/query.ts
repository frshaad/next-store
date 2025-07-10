import 'server-only'
import { type InferSelectModel, eq } from 'drizzle-orm'
import db from '@/db'
import { users } from './schema'

export async function getUserByEmail(
  email: string,
): Promise<InferSelectModel<typeof users> | undefined> {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  })
}
