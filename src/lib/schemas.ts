import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
})

export type AuthInputs = z.infer<typeof authSchema>
