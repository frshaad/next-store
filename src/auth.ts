import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import db from '@/db'

const PROTECTED_ROUTES = ['/dashboard', '/card'] as const
const AUTH_ROUTES = ['/register'] as const

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google, Github, Resend],
  pages: {
    signIn: '/register',
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user

      const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        nextUrl.pathname.startsWith(route),
      )

      if (isProtectedRoute) {
        return isLoggedIn ? true : false
      }

      const isAuthRoute = AUTH_ROUTES.some(route =>
        nextUrl.pathname.startsWith(route),
      )

      if (isAuthRoute) {
        return isLoggedIn ? Response.redirect(new URL('/', nextUrl)) : true
      }

      return true
    },
  },
})
