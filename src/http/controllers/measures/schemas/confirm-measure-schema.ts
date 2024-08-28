import z from 'zod'

export const confirmMeasureBodySchema = z.object({
  measure_uuid: z.string({
    required_error: 'measure_uuid é obrigatório',
  }),
  confirmed_value: z.number({
    required_error: 'confirmed_value é obrigatório',
  }),
})

export const confirmMeasureResponseSchema = {
  200: z.object({
    success: z.boolean(),
  }),
  400: z.object({
    error_code: z.string(),
    error_description: z.string(),
  }),
}
