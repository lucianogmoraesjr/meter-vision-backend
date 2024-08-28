import { fileToGenerativePart, gemini } from '@/lib/gemini'
import { MeasuresRepository } from '@/repositories/measures-repository'
import { StorageService } from '@/services/storage-service/storage-service'
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

    const { image_url } = await this.storageService.upload(image)

    const imagePart = fileToGenerativePart(destination, 'image/jpeg')
    const prompt =
      'You are receiving a photo of a consumption meter, this meter can be for water or gas. Return the integer value of the measured consumption.'

    const { response } = await gemini.generateContent([prompt, imagePart])

    const measure_value = Number(response.text())

    const measure = await this.measuresRepository.create({
      customer_code,
      measure_type,
      measure_datetime,
      image_url,
      measure_value: 1,
    })

    return measure
  }
}
