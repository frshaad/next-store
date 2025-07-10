'use server'

import { addUserToDB, getUserByEmail } from '@/db/query'
import { saltAndHashPassword } from '@/lib/auth-utils'
import { signUpSchema } from '@/lib/schemas'

export async function signup(formData: FormData) {
  const parsedInputs = signUpSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
  })

  if (!parsedInputs.success) {
    return {
      success: false,
      errors: parsedInputs.error.flatten().fieldErrors,
    }
  }

  const { email, name, password } = parsedInputs.data

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return {
      success: false,
      errors: 'User already exists',
    }
  }

  const hashedPassword = await saltAndHashPassword(password)

  await addUserToDB({
    email,
    name,
    hashedPassword,
  })

  return { success: true }
}
