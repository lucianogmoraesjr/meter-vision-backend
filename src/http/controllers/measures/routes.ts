import { FastifyInstance } from 'fastify'
import { confirmMeasureController } from './confirm-measure-controller'
import { createMeasureController } from './create-measure-controller'
import { fetchCustomerMeasuresController } from './fetch-customer-measures-controller'

export async function measuresRoutes(app: FastifyInstance) {
  app.addHook('onRoute', (routeOptions) => {
    if (routeOptions.schema) routeOptions.schema.tags = ['measure']
  })

  app.register(createMeasureController)
  app.register(confirmMeasureController)
  app.register(fetchCustomerMeasuresController)
}
