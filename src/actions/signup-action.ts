'use server'

import { addUserToDB, getUserByEmail } from '@/db/query'
import { saltAndHashPassword } from '@/lib/auth-utils'
import { type SignupInputs, signUpSchema } from '@/lib/schemas'

export async function signup(
  values: SignupInputs,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const parsedInputs = signUpSchema.safeParse(values)

    if (!parsedInputs.success) {
      const flattened = parsedInputs.error.flatten().fieldErrors
      const error =
        flattened.name?.[0] ??
        flattened.email?.[0] ??
        flattened.password?.[0] ??
        flattened.confirmPassword?.[0] ??
        'Invalid input. Please check your input values.'

      return {
        success: false,
        error,
      }
    }

    const { email, name, password } = parsedInputs.data

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return {
        success: false,
        error: 'User already exists',
      }
    }

    const hashedPassword = await saltAndHashPassword(password)

    await addUserToDB({
      email,
      name,
      hashedPassword,
    })

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Unexpected error. Please try again.' }
  }
}
