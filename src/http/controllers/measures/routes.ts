import { FastifyInstance } from 'fastify'
import { confirmMeasureController } from './confirm-measure-controller'
import { createMeasureController } from './create-measure-controller'

export async function measuresRoutes(app: FastifyInstance) {
  app.register(createMeasureController)
  app.register(confirmMeasureController)
}
