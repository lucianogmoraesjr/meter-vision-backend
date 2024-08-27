import { Measure, Prisma } from '@prisma/client'

export interface MeasuresRepository {
  create(data: Prisma.MeasureCreateInput): Promise<Measure>
}
