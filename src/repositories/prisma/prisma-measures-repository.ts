import { prisma } from '@/lib/prisma'
import { Measure, Prisma } from '@prisma/client'
import {
  FindByMonthAndTypeParams,
  MeasuresRepository,
} from '../measures-repository'

export class PrismaMeasuresRepository implements MeasuresRepository {
  async create(data: Prisma.MeasureCreateInput): Promise<Measure> {
    const measure = await prisma.measure.create({
      data,
    })

    return measure
  }

  async findByMonthAndType({
    customer_code,
    measure_month,
    measure_type,
  }: FindByMonthAndTypeParams): Promise<Measure | null> {
    const startDate = new Date()
    startDate.setMonth(measure_month)
    startDate.setDate(1)
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date()
    endDate.setMonth(startDate.getMonth() + 1)
    endDate.setDate(0)
    endDate.setHours(23, 59, 59, 999)

    const measure = await prisma.measure.findUnique({
      where: {
        customer_code,
        AND: {
          measure_type: measure_type,
          measure_datetime: {
            gte: startDate,
            lt: endDate,
          },
        },
      },
    })

    return measure
  }
}
