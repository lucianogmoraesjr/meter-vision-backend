import { randomUUID } from 'node:crypto'

import { Measure, Prisma } from '@prisma/client'

import {
  FindByMonthAndTypeParams,
  MeasuresRepository,
} from '../measures-repository'

export class InMemoryMeasuresRepository implements MeasuresRepository {
  public measures: Measure[] = []

  async create({
    measure_datetime,
    ...data
  }: Prisma.MeasureCreateInput): Promise<Measure> {
    const measure: Measure = {
      ...data,
      id: randomUUID(),
      has_confirmed: false,
      measure_datetime: measure_datetime
        ? new Date(measure_datetime)
        : new Date(),
    }

    this.measures.push(measure)

    return measure
  }

  async findByMonthAndType({
    customer_code,
    measure_month,
    measure_type,
  }: FindByMonthAndTypeParams): Promise<Measure | null> {
    const measure = this.measures.find((measure) => {
      if (
        measure.customer_code === customer_code &&
        new Date(measure.measure_datetime).getMonth() === measure_month &&
        measure.measure_type === measure_type
      ) {
        return measure
      }
    })

    if (!measure) {
      return null
    }

    return measure
  }
}
