import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  GEMINI_API_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  const errors = Object.entries(_env.error.flatten().fieldErrors)
    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
    .join('; ')

  throw new Error(`Invalid environment variables: ${errors}`)
}

export const env = _env.data
