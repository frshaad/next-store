'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { type SigninInputs, signInSchema } from '@/lib/schemas'

export async function login(
  values: SigninInputs,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const parsedInputs = signInSchema.safeParse(values)

    if (!parsedInputs.success) {
      const flattened = parsedInputs.error.flatten().fieldErrors
      const error =
        flattened.email?.[0] ??
        flattened.password?.[0] ??
        'Invalid input. Please check your credentials.'

      return {
        success: false,
        error,
      }
    }

    await signIn('credentials', { ...values, redirect: false })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return { success: false, error: 'Invalid email or password.' }
        }
        default: {
          return {
            success: false,
            error: 'Something went wrong. Please try again.',
          }
        }
      }
    }

    console.error('Login error:', error)
    return { success: false, error: 'Unexpected error. Please try again.' }
  }
}
