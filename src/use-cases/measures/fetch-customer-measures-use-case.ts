import { MeasuresRepository } from '@/repositories/measures-repository'
import { NotFoundError } from '../errors/not-found-error'

export class FetchCustomerMeasuresUseCase {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute(customer_code: string) {
    const measures =
      await this.measuresRepository.findAllByCustomerCode(customer_code)

    if (!measures) {
      throw new NotFoundError(
        'MEASURES_NOT_FOUND',
        'Nenhuma leitura encontrada',
      )
    }

    return {
      customer_code,
      measures: measures?.map((measure) => ({
        measure_uuid: measure.id,
        measure_datetime: measure.measure_datetime,
        has_confirmed: measure.has_confirmed,
        image_url: measure.image_url,
        measure_type: measure.measure_type,
      })),
    }
  }
}
