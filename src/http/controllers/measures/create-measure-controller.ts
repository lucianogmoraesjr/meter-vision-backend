import fs from 'node:fs'
import path from 'node:path'

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
      const extension = mimeType === 'jpeg' ? 'jpg' : mimeType
      const timestamp = new Date(measure_datetime).getTime()
      const filename = `${customer_code}-${measure_type.toLowerCase()}-${timestamp}.${extension}`

      const destination = path.resolve(__dirname, '../../../../tmp', filename)
      const buffer = Buffer.from(base64, 'base64')

      await fs.promises.writeFile(destination, buffer)

      const file = new File([buffer], filename)

      const createMeasureUseCase = makeCreateMeasureUseCase()

      const result = await createMeasureUseCase.execute({
        image: file,
        customer_code,
        measure_datetime,
        measure_type,
      })

      return reply.send(result)
    },
  )
}
