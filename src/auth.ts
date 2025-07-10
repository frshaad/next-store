import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcryptjs'
import db from '@/db'
import { getUserByEmail } from '@/db/query'
import { signInSchema } from '@/lib/schemas'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      authorize: async rawCredentials => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(rawCredentials)

          const user = await getUserByEmail(email)

          if (!user?.hashedPassword) {
            throw new Error('Invalid email or password.')
          }

          const isValid = await bcrypt.compare(password, user.hashedPassword)

          if (!isValid) {
            throw new Error('Invalid email or password.')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error('Credentials auth error:', error)
          throw new Error('Login failed. Please check your credentials.')
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/signin', // Optional: redirect to custom error page
  },
})
