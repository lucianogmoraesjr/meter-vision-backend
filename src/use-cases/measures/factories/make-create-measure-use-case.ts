import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'

import { DiskStorage } from '@/services/storage-service/disk-storage'
import { CreateMeasureUseCase } from '../create-measure-use-case'

export function makeCreateMeasureUseCase() {
  const measuresRepository = new PrismaMeasuresRepository()
  const storageService = new DiskStorage()
  return new CreateMeasureUseCase(measuresRepository, storageService)
}
