import { InMemoryMeasuresRepository } from '@/repositories/in-memory/in-memory-measures-repository'
import { NotFoundError } from '../errors/not-found-error'
import { FetchCustomerMeasuresUseCase } from './fetch-customer-measures-use-case'

let measuresRepository: InMemoryMeasuresRepository
let sut: FetchCustomerMeasuresUseCase

describe('Fetch customer measures use case', () => {
  beforeEach(() => {
    measuresRepository = new InMemoryMeasuresRepository()
    sut = new FetchCustomerMeasuresUseCase(measuresRepository)
  })

  it('should be able to fetch customer measures', async () => {
    await measuresRepository.create({
      customer_code: 'valid-customer-code',
      image_url: 'image-url',
      measure_type: 'GAS',
      measure_value: 100,
      has_confirmed: true,
    })

    await measuresRepository.create({
      customer_code: 'valid-customer-code',
      image_url: 'image-url',
      measure_type: 'WATER',
      measure_value: 120,
    })

    const measures = await sut.execute('valid-customer-code')

    expect(measures).toEqual(
      expect.objectContaining({
        customer_code: expect.any(String),
        measures: expect.arrayContaining([
          expect.objectContaining({ measure_uuid: expect.any(String) }),
        ]),
      }),
    )
  })

  it('should not be able to fetch a nonexistent customer measures', async () => {
    await expect(sut.execute('nonexistent-customer-code')).rejects.toThrowError(
      new NotFoundError('MEASURES_NOT_FOUND', 'Nenhuma leitura encontrada'),
    )
  })
})
