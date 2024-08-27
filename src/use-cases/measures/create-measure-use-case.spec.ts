import { InMemoryMeasuresRepository } from '@/repositories/in-memory/in-memory-measures-repository'
import { createTestImage } from 'test/utils/create-test-image'
import { DoubleReportError } from '../errors/double-report-error'
import { CreateMeasureUseCase } from './create-measure-use-case'

let measuresRepository: InMemoryMeasuresRepository
let sut: CreateMeasureUseCase

describe('Create measure use case', () => {
  beforeEach(() => {
    measuresRepository = new InMemoryMeasuresRepository()
    sut = new CreateMeasureUseCase(measuresRepository)
  })

  it('should be able to create a measure', async () => {
    const imageFile = await createTestImage('image-sample.jpeg', 'image/jpeg')

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

  it('should not be able to create if there is already a measure in the month and same type', async () => {
    const imageFile = await createTestImage('image-sample.jpeg', 'image/jpeg')

    await measuresRepository.create({
      image_url: 'image-url',
      customer_code: 'customer-code',
      measure_datetime: new Date(),
      measure_type: 'WATER',
      measure_value: 100,
    })

    await expect(
      sut.execute({
        image: imageFile,
        customer_code: 'customer-code',
        measure_datetime: new Date(),
        measure_type: 'WATER',
      }),
    ).rejects.toThrowError(DoubleReportError)
  })

  it('should be able to create a measure in same month but different type', async () => {
    const imageFile = await createTestImage('image-sample.jpeg', 'image/jpeg')

    await measuresRepository.create({
      image_url: 'image-url',
      customer_code: 'customer-code',
      measure_datetime: new Date(),
      measure_type: 'WATER',
      measure_value: 100,
    })

    const measure = await sut.execute({
      image: imageFile,
      customer_code: 'customer-code',
      measure_datetime: new Date(),
      measure_type: 'GAS',
    })

    expect(measure).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        measure_type: 'GAS',
      }),
    )
  })
})
