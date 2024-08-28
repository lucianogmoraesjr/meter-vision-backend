import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'
import { CreateMeasureUseCase } from '../create-measure-use-case'

export function makeCreateMeasureUseCase() {
  const measuresRepository = new PrismaMeasuresRepository()
  return new CreateMeasureUseCase(measuresRepository)
}
