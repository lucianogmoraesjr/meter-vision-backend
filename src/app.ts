import path from 'node:path'

import fastifyStatic from '@fastify/static'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { ZodError } from 'zod'
import { AppError } from './errors/app-error'
import { routes } from './http/routes'

export const app = fastify()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(routes)

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'tmp'),
  prefix: '/tmp/',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error_code: 'INVALID_DATA',
      error_description: error.issues[0].message,
    })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error_code: error.errorCode,
      error_description: error.errorDescription,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})
