import { randomUUID } from 'node:crypto'

import { Measure, Prisma } from '@prisma/client'

import { MeasuresRepository } from '../measures-repository'

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
}
