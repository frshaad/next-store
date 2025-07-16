import RegisterForm from '@/components/auth/register-form'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string | undefined }>
}) {
  const { callbackUrl } = await searchParams

  return (
    <div className="z-10 mx-auto flex h-screen w-full max-w-md flex-col justify-center gap-6 p-4">
      <RegisterForm callbackUrl={callbackUrl} />
    </div>
  )
}
