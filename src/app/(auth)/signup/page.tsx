import Link from 'next/link'
import { SignInButton } from '@/components/auth/signin-button'
import SignupForm from '@/components/auth/signup-form'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string | undefined }>
}) {
  const { callbackUrl } = await searchParams

  return (
    <>
      <div className="flex w-full gap-4">
        <SignInButton callbackUrl={callbackUrl} provider="google" size="sm" />
        <SignInButton callbackUrl={callbackUrl} provider="github" size="sm" />
      </div>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

      <SignupForm />

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link className="underline underline-offset-4" href="/signin">
          Sign in
        </Link>
      </div>
    </>
  )
}
