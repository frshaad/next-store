import { type Environment, environmentSchema } from './env-schema'

export function validateEnv(): Environment {
  const parsed = environmentSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    )
    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

const env = validateEnv()
export default env
