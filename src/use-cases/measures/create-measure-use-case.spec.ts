import { InMemoryMeasuresRepository } from '@/repositories/in-memory/in-memory-measures-repository'
import { FakeAIService } from 'test/services/ai-service/fake-ai-service'
import { FakeStorageService } from 'test/services/storage-service/fake-storage-service'
import { DoubleReportError } from '../errors/double-report-error'
import { CreateMeasureUseCase } from './create-measure-use-case'

let measuresRepository: InMemoryMeasuresRepository
let storageService: FakeStorageService
let AIService: FakeAIService
let sut: CreateMeasureUseCase

describe('Create measure use case', () => {
  beforeEach(() => {
    measuresRepository = new InMemoryMeasuresRepository()
    storageService = new FakeStorageService()
    AIService = new FakeAIService()
    sut = new CreateMeasureUseCase(
      measuresRepository,
      storageService,
      AIService,
    )
  })

  it('should be able to create a measure', async () => {
    const measure = await sut.execute({
      image: 'some-valid-base-64-image',
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
    await measuresRepository.create({
      image_url: 'image-url',
      customer_code: 'customer-code',
      measure_datetime: new Date(),
      measure_type: 'WATER',
      measure_value: 100,
    })

    await expect(
      sut.execute({
        image: 'some-valid-base-64-image',
        customer_code: 'customer-code',
        measure_datetime: new Date(),
        measure_type: 'WATER',
      }),
    ).rejects.toThrowError(DoubleReportError)
  })

  it('should be able to create a measure in same month but different type', async () => {
    await measuresRepository.create({
      image_url: 'image-url',
      customer_code: 'customer-code',
      measure_datetime: new Date(),
      measure_type: 'WATER',
      measure_value: 100,
    })

    const measure = await sut.execute({
      image: 'some-valid-base-64-image',
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
