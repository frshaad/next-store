'use server'

import { addUserToDB, getUserByEmail } from '@/db/query'
import { saltAndHashPassword } from '@/lib/auth-utils'
import { signUpSchema } from '@/lib/schemas'

export async function signup(formData: FormData) {
  const parsedInputs = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
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
