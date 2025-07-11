'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { type SigninInputs } from '@/lib/schemas'

export async function login(
  values: SigninInputs,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
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

    return { success: false, error: 'Unexpected error. Please try again.' }
  }
}
