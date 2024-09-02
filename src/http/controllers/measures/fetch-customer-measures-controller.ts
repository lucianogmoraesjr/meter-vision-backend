import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { makeFetchCustomerMeasuresUseCase } from '@/use-cases/measures/factories/make-fetch-customer-measures-use-case'
import {
  fetchCustomerMeasureParamsSchema,
  fetchCustomerMeasureQueryStringSchema,
  fetchCustomerMeasureResponseSchema,
} from './schemas/fetch-customer-measures-schema'

export const fetchCustomerMeasuresController: FastifyPluginAsyncZod = async (
  app,
) => {
  app.get(
    '/:customerCode/list',
    {
      schema: {
        summary: 'Fetch all measures by customer_code',
        params: fetchCustomerMeasureParamsSchema,
        querystring: fetchCustomerMeasureQueryStringSchema,
        response: fetchCustomerMeasureResponseSchema,
      },
    },
    async (request, reply) => {
      const { customerCode } = request.params
      const { measure_type } = request.query

      const fetchCustomerMeasuresUseCase = makeFetchCustomerMeasuresUseCase()

      const measures = await fetchCustomerMeasuresUseCase.execute({
        customer_code: customerCode,
        query: measure_type,
      })

      return reply.send(measures)
    },
  )
}
