import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcryptjs'
import db from '@/db'
import { signInSchema } from '@/lib/schemas'

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
        let user:
          | {
              email: string
              password: string
            }
          | undefined

        const { email, password } = await signInSchema.parseAsync(credentials)

        // logic to verify if the user exists
        // user = await getUserFromDb(email) (will replace it with drizzle)

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error('Invalid credentials.')
        }

        // if user with 'email' exists, then compare user.password with provided password
        // const hashedPassword = saltAndHashPassword(password)
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
          throw new Error('Password is wrong')
        }

        // return user object with their profile data
        return user
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
})
