import fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

import { makeCreateMeasureUseCase } from '@/use-cases/measures/factories/make-create-measure-use-case'
import { generateUniqueFilename } from '@/utils/generate-unique-filename'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

const pump = promisify(pipeline)

export const createMeasureController: FastifyPluginAsyncZod = async (app) => {
  app.post('/', {}, async (request, reply) => {
    const data = await request.file()

    if (!data) {
      return reply.status(400).send({
        error_code: 'INVALID_DATA',
        error_description: 'Missing image input.',
      })
    }

    const filename = generateUniqueFilename(data.filename)

    const destination = path.resolve(__dirname, '../../../../tmp', filename)

    await pump(data.file, fs.createWriteStream(destination))

    const createMeasureUseCase = makeCreateMeasureUseCase()

    const result = await createMeasureUseCase.execute({
      image: new File([await data.toBuffer()], filename),
      customer_code: '1234',
      measure_datetime: new Date(),
      measure_type: 'WATER',
    })

    return reply.send(result)
  })
}
