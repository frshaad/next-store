'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { signup } from '@/actions/signup-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  type SignupInputs,
  signUpSchema,
} from '@/lib/schemas'

export default function SignupForm() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignupInputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: SignupInputs) {
    setError(null)

    startTransition(async () => {
      const result = await signup(values)

      if (result.success) {
        toast.success('Successfuly signed up. welcome!')
        router.push('/')
      } else {
        setError(result.error)
        toast.error(result.error)
      }
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormDescription>
                Must be {MIN_PASSWORD_LENGTH}-{MAX_PASSWORD_LENGTH} characters
                long and include an uppercase letter, a lowercase letter, and a
                number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
              Creating your account…
            </span>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </Form>
  )
}
