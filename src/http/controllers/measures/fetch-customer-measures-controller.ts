import { makeFetchCustomerMeasuresUseCase } from '@/use-cases/measures/factories/make-fetch-customer-measures-use-case'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const fetchCustomerMeasuresController: FastifyPluginAsyncZod = async (
  app,
) => {
  app.get(
    '/:customerCode/list',
    {
      schema: {
        params: z.object({
          customerCode: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { customerCode } = request.params

      const fetchCustomerMeasuresUseCase = makeFetchCustomerMeasuresUseCase()

      const measures = await fetchCustomerMeasuresUseCase.execute(customerCode)

      return reply.send(measures)
    },
  )
}
