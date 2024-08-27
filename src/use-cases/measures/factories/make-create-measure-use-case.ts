import { InMemoryMeasuresRepository } from '@/repositories/in-memory/in-memory-measures-repository'
import { CreateMeasureUseCase } from '../create-measure-use-case'

export function makeCreateMeasureUseCase() {
  const measuresRepository = new InMemoryMeasuresRepository()
  return new CreateMeasureUseCase(measuresRepository)
}
