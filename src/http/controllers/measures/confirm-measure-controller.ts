import { makeConfirmMeasureUseCase } from '@/use-cases/measures/factories/make-confirm-measure-use-case'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import {
  confirmMeasureBodySchema,
  confirmMeasureResponseSchema,
} from './schemas/confirm-measure-schema'

export const confirmMeasureController: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/confirm',
    {
      schema: {
        summary: 'Confirm measure',
        body: confirmMeasureBodySchema,
        response: confirmMeasureResponseSchema,
      },
    },
    async (request, reply) => {
      const { confirmed_value, measure_uuid } = request.body

      const confirmMeasureUseCase = makeConfirmMeasureUseCase()

      await confirmMeasureUseCase.execute({
        confirmed_value,
        measure_uuid,
      })

      return reply.status(200).send({ success: true })
    },
  )
}
