'use server'

import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'
import { type SigninInputs } from '@/lib/schemas'

const SIGNIN_ERROR_URL = '/error'

export async function login(values: SigninInputs) {
  try {
    await signIn('credentials', values)
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
    }
    throw error
  }
}
