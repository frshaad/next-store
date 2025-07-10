import { z } from 'zod'

const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 32
const MIN_NAME_LENGTH = 8
const MAX_NAME_LENGTH = 50

const passwordSchema = z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(MIN_PASSWORD_LENGTH, {
    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  })
  .max(MAX_PASSWORD_LENGTH, {
    message: `Password must be at most ${MAX_PASSWORD_LENGTH} characters long`,
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Password must contain at least one special character',
  })
  .trim()

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email')
    .trim(),
  password: passwordSchema,
})

export const signUpSchema = signInSchema
  .extend({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(MIN_NAME_LENGTH, {
        message: `Name must be at least ${MIN_NAME_LENGTH} characters long`,
      })
      .max(MAX_NAME_LENGTH, {
        message: `Name must be at most ${MAX_NAME_LENGTH} characters long`,
      })
      .trim(),
    confirmPassword: passwordSchema,
  })
  .refine(inputs => inputs.password === inputs.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SigninInputs = z.infer<typeof signInSchema>
export type SignupInputs = z.infer<typeof signUpSchema>
