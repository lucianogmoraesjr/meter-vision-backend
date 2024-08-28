import { InvalidTypeError } from '@/errors/invalid-type-error'
import z from 'zod'

const MeasureType = ['WATER', 'GAS'] as const
type MeasureTypeEnum = (typeof MeasureType)[number]

export const fetchCustomerMeasureParamsSchema = z.object({
  customerCode: z.string(),
})

export const fetchCustomerMeasureQueryStringSchema = z.object({
  measure_type: z
    .string()
    .trim()
    .toUpperCase()
    .refine(
      (value) => {
        if (MeasureType.includes(value as (typeof MeasureType)[number])) {
          return value
        }
      },
      () => {
        throw new InvalidTypeError()
      },
    )
    .transform((value) => value as MeasureTypeEnum)
    .optional(),
})
