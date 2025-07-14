import { SignInWithResend } from '@/components/auth/resend-signin-button'
import { SignInButton } from '@/components/auth/signin-button'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string | undefined }>
}) {
  const { callbackUrl } = await searchParams

  return (
    <>
      <div className="flex flex-col gap-4">
        <SignInButton callbackUrl={callbackUrl} provider="google" />
        <SignInButton callbackUrl={callbackUrl} provider="github" />
      </div>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

      <SignInWithResend />
    </>
  )
}
