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
    customerCode,
    measureMonth,
    measureType,
  }: FindByMonthAndTypeParams): Promise<Measure | null> {
    const measure = this.measures.find((measure) => {
      if (
        measure.customer_code === customerCode &&
        new Date(measure.measure_datetime).getMonth() === measureMonth &&
        measure.measure_type === measureType
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
