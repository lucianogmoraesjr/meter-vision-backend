import { MeasuresRepository } from '@/repositories/measures-repository'
import { AIService } from '@/services/ai-service/ai-service'
import { StorageService } from '@/services/storage-service/storage-service'
import { BadImageError } from '../errors/bad-image-error'
import { DoubleReportError } from '../errors/double-report-error'

interface CreateMeasureUseCaseRequest {
  image: string
  customer_code: string
  measure_datetime: Date
  measure_type: 'WATER' | 'GAS'
}

export class CreateMeasureUseCase {
  constructor(
    private readonly measuresRepository: MeasuresRepository,
    private readonly storageService: StorageService,
    private readonly AIService: AIService,
  ) {}

  async execute({
    customer_code,
    measure_type,
    measure_datetime,
    image,
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

    const { image_url, filename, mimeType } =
      await this.storageService.upload(image)

    const value = await this.AIService.getValueFromImage({
      filename,
      image_url,
      mimeType,
    })

    if (Number(value) === -1) {
      throw new BadImageError()
    }

    const measure = await this.measuresRepository.create({
      customer_code,
      measure_type,
      measure_datetime,
      image_url,
      measure_value: Number(value),
    })

    return measure
  }
}
