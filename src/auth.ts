import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcryptjs'
import db from '@/db'
import { signInSchema } from '@/lib/schemas'
import { getUserByEmail } from './db/query'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async credentials => {
        const { email, password } = await signInSchema.parseAsync(credentials)

        const user = await getUserByEmail(email)

        if (!user) {
          throw new Error('Invalid credentials.')
        }

        if (!user.hashedPassword) {
          throw new Error('You should sign in with OAuth.')
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        )

        if (!passwordMatch) {
          throw new Error('Password is wrong')
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
})
