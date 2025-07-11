'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { login } from '@/actions/signin-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type SigninInputs, signInSchema } from '@/lib/schemas'

export default function LoginForm() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<SigninInputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: SigninInputs) {
    setError(null)

    startTransition(async () => {
      const result = await login(values)

      if (result.success) {
        toast.success('Successfuly logged in. redirecting...')
        router.push('/')
      } else {
        setError(result.error)
        toast.error(result.error)
      }
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="m@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pr-10"
                    disabled={isPending}
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                  <Button
                    className="absolute top-1/2 right-0 -translate-y-1/2"
                    tabIndex={-1}
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPassword(c => !c)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!!error && (
          <p aria-live="polite" className="text-destructive text-sm">
            {error}
          </p>
        )}

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" />
              Signing in…
            </span>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </Form>
  )
}
