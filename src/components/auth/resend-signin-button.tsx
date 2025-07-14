'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { register } from '@/actions/register-action'
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
import { type AuthInputs, authSchema } from '@/lib/schemas'

export function SignInWithResend() {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<AuthInputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: AuthInputs) {
    setError(null)

    startTransition(async () => {
      const result = await register(values)

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
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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

        {!!error && (
          <p aria-live="polite" className="text-destructive text-sm">
            {error}
          </p>
        )}

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" />
              Please wait…
            </span>
          ) : (
            'Continue with email'
          )}
        </Button>
      </form>
    </Form>
  )
}
