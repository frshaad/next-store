import RegisterForm from '@/components/auth/register-form'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string | undefined }>
}) {
  const { callbackUrl } = await searchParams

  return <RegisterForm callbackUrl={callbackUrl} />
}
