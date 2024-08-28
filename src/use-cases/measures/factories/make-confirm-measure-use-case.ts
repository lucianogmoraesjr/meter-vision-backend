import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'
import { ConfirmMeasureUseCase } from '../confirm-measure-use-case'

export function makeConfirmMeasureUseCase() {
  const measuresRepository = new PrismaMeasuresRepository()
  return new ConfirmMeasureUseCase(measuresRepository)
}
