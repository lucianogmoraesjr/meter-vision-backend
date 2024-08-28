import { Measure, MeasureType, Prisma } from '@prisma/client'

export interface FindByMonthAndTypeParams {
  customer_code: string
  measure_month: number
  measure_type: MeasureType
}

export interface UpdateMeasureParams {
  measure_uuid: string
  confirmed_value: number
}

export interface MeasuresRepository {
  create(data: Prisma.MeasureCreateInput): Promise<Measure>
  confirm(data: UpdateMeasureParams): Promise<Measure>
  findById(id: string): Promise<Measure | null>
  findByMonthAndType(data: FindByMonthAndTypeParams): Promise<Measure | null>
  findAllByCustomerCode(customer_code: string): Promise<Measure[] | null>
}
