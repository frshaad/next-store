'use server'

import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'

const SIGNIN_ERROR_URL = '/error'

export async function login(formData: FormData) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
    }
    throw error
  }
}
