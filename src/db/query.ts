import 'server-only'
import { type InferInsertModel, type InferSelectModel, eq } from 'drizzle-orm'
import db from '@/db'
import { users } from './schema'

export async function getUserByEmail(
  email: string,
): Promise<InferSelectModel<typeof users> | undefined> {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  })
}

export async function addUserToDB(
  data: Pick<
    InferInsertModel<typeof users>,
    'email' | 'name' | 'hashedPassword'
  >,
) {
  return await db.insert(users).values(data)
}
