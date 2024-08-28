import { randomUUID } from 'node:crypto'

import { Measure, Prisma } from '@prisma/client'

import {
  FindAllByCustomerCodeParams,
  FindByMonthAndTypeParams,
  MeasuresRepository,
  UpdateMeasureParams,
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
      has_confirmed: data.has_confirmed ?? false,
      measure_datetime: measure_datetime
        ? new Date(measure_datetime)
        : new Date(),
    }

    this.measures.push(measure)

    return measure
  }

  async confirm({
    confirmed_value,
    measure_uuid,
  }: UpdateMeasureParams): Promise<Measure> {
    const measureIndex = this.measures.findIndex(
      (measure) => measure.id === measure_uuid,
    )

    if (measureIndex >= 0) {
      this.measures[measureIndex].measure_value = confirmed_value
      this.measures[measureIndex].has_confirmed = true
    }

    return this.measures[measureIndex]
  }

  async findById(id: string): Promise<Measure | null> {
    const measure = this.measures.find((measure) => measure.id === id)

    if (!measure) {
      return null
    }

    return measure
  }

  async findAllByCustomerCode({
    customer_code,
    measure_type,
  }: FindAllByCustomerCodeParams): Promise<Measure[] | null> {
    const measures = this.measures.filter((measure) => {
      if (measure_type) {
        if (
          measure.customer_code === customer_code &&
          measure.measure_type === measure_type
        ) {
          return measure
        }
      } else {
        if (measure.customer_code === customer_code) {
          return measure
        }
      }
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
