import { makeFetchCustomerMeasuresUseCase } from '@/use-cases/measures/factories/make-fetch-customer-measures-use-case'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import {
  fetchCustomerMeasureParamsSchema,
  fetchCustomerMeasureQueryStringSchema,
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
