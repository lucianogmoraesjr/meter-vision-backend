import { prisma } from '@/lib/prisma'
import { Measure, Prisma } from '@prisma/client'
import {
  FindAllByCustomerCodeParams,
  FindByMonthAndTypeParams,
  MeasuresRepository,
  UpdateMeasureParams,
} from '../measures-repository'

export class PrismaMeasuresRepository implements MeasuresRepository {
  async create(data: Prisma.MeasureCreateInput): Promise<Measure> {
    const measure = await prisma.measure.create({
      data,
    })

    return measure
  }

  async confirm({
    confirmed_value,
    measure_uuid,
  }: UpdateMeasureParams): Promise<Measure> {
    const measure = await prisma.measure.update({
      where: {
        id: measure_uuid,
      },
      data: {
        measure_value: confirmed_value,
        has_confirmed: true,
      },
    })

    return measure
  }

  async findById(id: string): Promise<Measure | null> {
    const measure = await prisma.measure.findUnique({
      where: {
        id,
      },
    })

    return measure
  }

  async findAllByCustomerCode({
    customer_code,
    measure_type,
  }: FindAllByCustomerCodeParams): Promise<Measure[] | null> {
    const measures = await prisma.measure.findMany({
      where: measure_type
        ? {
            customer_code,
            measure_type,
          }
        : {
            customer_code,
          },
    })

    if (measures.length === 0) {
      return null
    }

    return measures
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

    const measure = await prisma.measure.findFirst({
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
