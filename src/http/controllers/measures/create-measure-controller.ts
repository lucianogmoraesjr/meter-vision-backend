import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeCreateMeasureUseCase } from '@/use-cases/measures/factories/make-create-measure-use-case'

export const createMeasureController: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/',
    {
      schema: {
        body: z.object({
          image: z.string(),
          customer_code: z.string(),
          measure_type: z.enum(['WATER', 'GAS']),
          measure_datetime: z.coerce.date(),
        }),
        response: {
          201: z.object({
            image_url: z.string().url(),
            measure_value: z.number(),
            measure_uuid: z.string().uuid(),
          }),
          400: z.object({
            error_code: z.string(),
            error_description: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { image, customer_code, measure_type, measure_datetime } =
        request.body

      const [dataSchema, base64] = image.split(',')
      const mimeMatch = dataSchema.match(/^data:image\/(png|jpg|jpeg);base64$/)

      if (!mimeMatch) {
        return reply.status(400).send({
          error_code: 'INVALID_DATA',
          error_description:
            'Image must be in base64 format with PNG, JPEG, or JPG type.',
        })
      }

      const mimeType = mimeMatch[1]

      const createMeasureUseCase = makeCreateMeasureUseCase()

      const measure = await createMeasureUseCase.execute({
        image: {
          base64,
          mimeType,
        },
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
