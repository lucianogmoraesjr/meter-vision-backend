import path from 'node:path'

import fastifyStatic from '@fastify/static'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { ZodError } from 'zod'

import fastifyCors from '@fastify/cors'
import { AppError } from './errors/app-error'
import { routes } from './http/routes'

export const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'MeterVision',
      description:
        'Especificações da API para o back-end da aplicação MeterVision, um serviço de backend para gerenciamento de leitura de consumo individual de água e gás, utilizando inteligência artificial para extrair medições a partir de fotos de medidores.',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

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
