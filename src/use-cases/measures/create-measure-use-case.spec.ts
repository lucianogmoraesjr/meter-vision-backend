import { promises as fs } from 'fs'
import path from 'node:path'

import { InMemoryMeasuresRepository } from '@/repositories/in-memory/in-memory-measures-repository'
import { CreateMeasureUseCase } from './create-measure-use-case'

let measuresRepository: InMemoryMeasuresRepository
let sut: CreateMeasureUseCase

describe('Create measure use case', () => {
  beforeEach(() => {
    measuresRepository = new InMemoryMeasuresRepository()
    sut = new CreateMeasureUseCase(measuresRepository)
  })

  it('should be able to create a measure', async () => {
    const imagePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'test',
      'assets',
      'image-sample.jpeg',
    )

    const imageBuffer = await fs.readFile(imagePath)

    const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' })

    const imageFile = new File([imageBlob], 'image-sample.jpeg', {
      type: 'image/jpeg',
    })

    const measure = await sut.execute({
      image: imageFile,
      customer_code: 'customer-code',
      measure_datetime: new Date(),
      measure_type: 'WATER',
    })

    expect(measure).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        measure_type: 'WATER',
      }),
    )
  })
})
