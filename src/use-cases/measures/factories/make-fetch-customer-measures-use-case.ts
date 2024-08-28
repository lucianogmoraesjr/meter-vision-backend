import { PrismaMeasuresRepository } from '@/repositories/prisma/prisma-measures-repository'
import { FetchCustomerMeasuresUseCase } from '../fetch-customer-measures-use-case'

export function makeFetchCustomerMeasuresUseCase() {
  const measuresRepository = new PrismaMeasuresRepository()
  return new FetchCustomerMeasuresUseCase(measuresRepository)
}
