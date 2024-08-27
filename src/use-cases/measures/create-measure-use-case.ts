import { MeasuresRepository } from '@/repositories/measures-repository'
import { DoubleReportError } from '../errors/double-report-error'

interface CreateMeasureUseCaseRequest {
  image: File
  customer_code: string
  measure_datetime: Date
  measure_type: 'WATER' | 'GAS'
}

export class CreateMeasureUseCase {
  constructor(private readonly measuresRepository: MeasuresRepository) {}

  async execute({
    customer_code,
    measure_type,
    measure_datetime,
  }: CreateMeasureUseCaseRequest) {
    const measureMonth = new Date(measure_datetime).getMonth()

    const measureAlreadyExists =
      await this.measuresRepository.findByMonthAndType({
        customer_code,
        measure_type,
        measure_month: measureMonth,
      })

    if (measureAlreadyExists) {
      throw new DoubleReportError()
    }

    const measure_value = 1
    const image_url = 'http://localhost:3333/image.jpg'

    const measure = await this.measuresRepository.create({
      customer_code,
      measure_type,
      measure_datetime,
      image_url,
      measure_value,
    })

    return measure
  }
}
