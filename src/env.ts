import { z } from 'zod'

const envSchema = z.object({
  GEMINI_API_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  const errors = JSON.stringify(_env.error.flatten().fieldErrors)

  throw new Error(`Invalid environment variables: ${errors}`)
}

export const env = _env.data
