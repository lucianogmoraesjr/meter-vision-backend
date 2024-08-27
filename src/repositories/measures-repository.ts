import { Measure, MeasureType, Prisma } from '@prisma/client'

export interface FindByMonthAndTypeParams {
  customer_code: string
  measure_month: number
  measure_type: MeasureType
}

export interface MeasuresRepository {
  create(data: Prisma.MeasureCreateInput): Promise<Measure>
  findByMonthAndType(data: FindByMonthAndTypeParams): Promise<Measure | null>
}
