import { z } from 'zod'

export const environmentSchema = z.object({
  DATABASE_URL: z.string(),
})

export type Environment = z.infer<typeof environmentSchema>
