import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  datasourceUrl:
    'postgresql://docker:docker@localhost:5432/metervision?schema=public',
})
