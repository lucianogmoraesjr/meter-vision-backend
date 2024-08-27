import { fastifyMultipart } from '@fastify/multipart'
import { FastifyInstance } from 'fastify'
import { createMeasureController } from './create-measure-controller'

export async function measuresRoutes(app: FastifyInstance) {
  app.register(fastifyMultipart)

  app.register(createMeasureController)
}
