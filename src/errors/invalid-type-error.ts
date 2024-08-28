import { AppError } from './app-error'

export class InvalidTypeError extends AppError {
  constructor() {
    super(400, 'INVALID_TYPE', 'Tipo de medição não permitida')
  }
}
