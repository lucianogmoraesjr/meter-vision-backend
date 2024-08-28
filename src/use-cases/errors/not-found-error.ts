import { AppError } from '@/errors/app-error'

export class NotFoundError extends AppError {
  constructor(errorCode: string, errorDescription: string) {
    super(404, errorCode, errorDescription)
  }
}
