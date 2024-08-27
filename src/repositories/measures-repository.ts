import { Measure, MeasureType, Prisma } from '@prisma/client'

export interface FindByMonthAndTypeParams {
  customerCode: string
  measureMonth: number
  measureType: MeasureType
}

export interface MeasuresRepository {
  create(data: Prisma.MeasureCreateInput): Promise<Measure>
  findByMonthAndType(data: FindByMonthAndTypeParams): Promise<Measure | null>
}
