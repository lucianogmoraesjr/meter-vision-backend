import { AppError } from '@/errors/app-error'

export class DuplicateError extends AppError {
  constructor(errorCode: string, errorDescription: string) {
    super(409, errorCode, errorDescription)
  }
}
