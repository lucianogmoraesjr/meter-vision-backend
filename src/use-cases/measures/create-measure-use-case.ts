import fs from 'node:fs'
import path from 'node:path'

import { fileToGenerativePart, gemini } from '@/lib/gemini'
import { MeasuresRepository } from '@/repositories/measures-repository'
import { DoubleReportError } from '../errors/double-report-error'

interface CreateMeasureUseCaseRequest {
  image: {
    base64: string
    mimeType: string
  }
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

    const filename = this.generateUniqueFilename(
      customer_code,
      measure_type,
      measure_datetime,
      image.mimeType,
    )

    const destination = path.resolve(__dirname, '../../../tmp', filename)

    try {
      this.ensureDirectoryExists(path.dirname(destination))
      const buffer = Buffer.from(image.base64, 'base64')
      await fs.promises.writeFile(destination, buffer)

      const imagePart = fileToGenerativePart(destination, 'image/jpeg')
      const prompt =
        'You are receiving a photo of a consumption meter, this meter can be for water or gas. Return the integer value of the measured consumption.'

      const { response } = await gemini.generateContent([prompt, imagePart])

      const measure_value = Number(response.text())
      const image_url = `http://localhost:3333/tmp/${filename}`

      const measure = await this.measuresRepository.create({
        customer_code,
        measure_type,
        measure_datetime,
        image_url,
        measure_value,
      })

      return measure
    } catch {
      throw new Error(`Error processing measure`)
    }
  }

  private generateUniqueFilename(
    customer_code: string,
    measure_type: 'WATER' | 'GAS',
    measure_datetime: Date,
    mimeType: string,
  ) {
    const extension = mimeType === 'jpeg' ? 'jpg' : mimeType
    const timestamp = new Date(measure_datetime).getTime()
    return `${customer_code}-${measure_type.toLowerCase()}-${timestamp}.${extension}`
  }

  private ensureDirectoryExists(directory: string) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
  }
}
