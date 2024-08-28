import { InMemoryMeasuresRepository } from '@/repositories/in-memory/in-memory-measures-repository'
import { DuplicateError } from '../errors/duplicate-error'
import { NotFoundError } from '../errors/not-found-error'
import { ConfirmMeasureUseCase } from './confirm-measure-use-case'

let measuresRepository: InMemoryMeasuresRepository
let sut: ConfirmMeasureUseCase

describe('Confirm measure use case', () => {
  beforeEach(() => {
    measuresRepository = new InMemoryMeasuresRepository()
    sut = new ConfirmMeasureUseCase(measuresRepository)
  })

  it('should be able to confirm a measure', async () => {
    const measure = await measuresRepository.create({
      customer_code: 'customer-code',
      image_url: 'image-url',
      measure_type: 'GAS',
      measure_value: 100,
    })

    await sut.execute({
      measure_uuid: measure.id,
      confirmed_value: 100,
    })

    expect(measuresRepository.measures[0].has_confirmed).toBe(true)
  })

  it('should not be able to confirm a nonexistent measure', async () => {
    await expect(
      sut.execute({
        measure_uuid: 'measure-id',
        confirmed_value: 100,
      }),
    ).rejects.toThrowError(
      new NotFoundError('MEASURE_NOT_FOUND', 'Leitura do mês não encontrada'),
    )
  })

  it('should not be able to confirm an already confirmed measure', async () => {
    const measure = await measuresRepository.create({
      customer_code: 'customer-code',
      image_url: 'image-url',
      measure_type: 'GAS',
      measure_value: 100,
      has_confirmed: true,
    })

    console.log(measure)

    await expect(
      sut.execute({
        measure_uuid: measure.id,
        confirmed_value: 100,
      }),
    ).rejects.toThrowError(
      new DuplicateError(
        'CONFIRMATION_DUPLICATE',
        'Leitura do mês já realizada',
      ),
    )
  })
})
