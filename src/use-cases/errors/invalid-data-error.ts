import { AppError } from '@/errors/app-error'

export class InvalidDataError extends AppError {
  constructor(errorDescription: string) {
    super(400, 'INVALID_DATA', errorDescription)
  }
}
