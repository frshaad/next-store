'use server'

import { signIn } from '@/auth'
import { type AuthInputs, authSchema } from '@/lib/schemas'

export async function register(
  values: AuthInputs,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const parsedInputs = authSchema.safeParse(values)

    if (!parsedInputs.success) {
      const error = parsedInputs.error.issues[0].message

      return {
        success: false,
        error,
      }
    }

    const { email } = parsedInputs.data

    await signIn('resend', { email })
    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Unexpected error. Please try again.' }
  }
}
