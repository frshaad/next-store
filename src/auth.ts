import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcryptjs'
import type { InferSelectModel } from 'drizzle-orm'
import db from '@/db'
import { getUserByEmail } from '@/db/query'
import type { users } from '@/db/schema'
import { signInSchema } from '@/lib/schemas'

type User = Pick<
  InferSelectModel<typeof users>,
  'email' | 'id' | 'image' | 'name'
>

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

      authorize: async (rawCredentials): Promise<User | null> => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(rawCredentials)

          const user = await getUserByEmail(email)

          if (!user?.hashedPassword) {
            throw new Error('Invalid email or password.')
          }

          const passwordMatch = await bcrypt.compare(
            password,
            user.hashedPassword,
          )

          if (!passwordMatch) {
            throw new Error('Invalid email or password.')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          if (error instanceof CredentialsSignin) {
            throw error
          }
          throw new Error('Something went wrong. Please try again.')
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin', // Optional: redirect to custom error page
  },
})
