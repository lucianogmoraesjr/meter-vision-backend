import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'

import { GeminiAiService } from '@/services/ai-service/gemini-ai-service'
import { DiskStorage } from '@/services/storage-service/disk-storage'
import { CreateMeasureUseCase } from '../create-measure-use-case'

export function makeCreateMeasureUseCase() {
  const measuresRepository = new PrismaMeasuresRepository()
  const storageService = new DiskStorage()
  const AIService = new GeminiAiService()
  return new CreateMeasureUseCase(measuresRepository, storageService, AIService)
}
