import Link from 'next/link'
import LoginForm from '@/components/auth/login-form'
import { SignInButton } from '@/components/auth/signin-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string | undefined }>
}) {
  const { callbackUrl } = await searchParams

  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col justify-center gap-6 p-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <SignInButton callbackUrl={callbackUrl} provider="google" />
              <SignInButton callbackUrl={callbackUrl} provider="github" />
            </div>

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>

            <LoginForm />
          </div>
        </CardContent>
        <CardFooter className="mx-auto">
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link className="underline underline-offset-4" href="/signup">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy.
      </div>
    </div>
  )
}
