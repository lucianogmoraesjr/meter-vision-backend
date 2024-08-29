import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { makeCreateMeasureUseCase } from '@/use-cases/measures/factories/make-create-measure-use-case'
import {
  createMeasureBodySchema,
  createMeasureResponseSchema,
} from './schemas/create-measure-schema'

export const createMeasureController: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/',
    {
      schema: {
        summary: 'Create an measure',
        body: createMeasureBodySchema,
        response: createMeasureResponseSchema,
      },
    },
    async (request, reply) => {
      const { image, customer_code, measure_type, measure_datetime } =
        request.body

      const createMeasureUseCase = makeCreateMeasureUseCase()

      const measure = await createMeasureUseCase.execute({
        image,
        customer_code,
        measure_datetime,
        measure_type,
      })

      return reply.status(201).send({
        image_url: measure.image_url,
        measure_uuid: measure.id,
        measure_value: measure.measure_value,
      })
    },
  )
}
