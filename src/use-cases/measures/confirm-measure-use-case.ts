import { MeasuresRepository } from '@/repositories/measures-repository'
import { DuplicateError } from '../errors/duplicate-error'
import { NotFoundError } from '../errors/not-found-error'

interface ConfirmMeasureUseCaseRequest {
  measure_uuid: string
  confirmed_value: number
}

export class ConfirmMeasureUseCase {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute({
    confirmed_value,
    measure_uuid,
  }: ConfirmMeasureUseCaseRequest) {
    const measureExists = await this.measuresRepository.findById(measure_uuid)

    if (!measureExists) {
      throw new NotFoundError(
        'MEASURE_NOT_FOUND',
        'Leitura do mês não encontrada',
      )
    }

    if (measureExists.has_confirmed === true) {
      throw new DuplicateError(
        'CONFIRMATION_DUPLICATE',
        'Leitura do mês já realizada',
      )
    }

    await this.measuresRepository.confirm({
      confirmed_value,
      measure_uuid,
    })
  }
}
