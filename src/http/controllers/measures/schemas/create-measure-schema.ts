import { z } from 'zod'

export const imageSchema = z
  .string({ required_error: 'Image is required' })
  .refine(
    (value) => {
      const regex = /^data:image\/(png|jpg|jpeg);base64/
      return regex.test(value)
    },
    {
      message:
        'Invalid image format. Must be a valid base64 image string with PNG, JPEG, or JPG type.',
    },
  )
  .or(
    z.string().base64({
      message:
        'Invalid image format. Must be a valid base64 image string with PNG, JPEG, or JPG type.',
    }),
  )

export const createMeasureBodySchema = z.object({
  image: imageSchema,
  customer_code: z.string({ required_error: 'Customer code is required' }),
  measure_type: z.enum(['WATER', 'GAS'], {
    required_error: 'Type is required',
  }),
  measure_datetime: z.coerce.date({
    required_error: 'Measure datetime is required',
  }),
})

export const createMeasureResponseSchema = {
  201: z.object({
    image_url: z.string().url(),
    measure_value: z.number(),
    measure_uuid: z.string().uuid(),
  }),
  400: z.object({
    error_code: z.string(),
    error_description: z.string(),
  }),
}
