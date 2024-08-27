import { FastifyInstance } from 'fastify'
import { measuresRoutes } from './controllers/measures/routes'

export async function routes(app: FastifyInstance) {
  app.register(measuresRoutes, { prefix: '/measures' })
}
