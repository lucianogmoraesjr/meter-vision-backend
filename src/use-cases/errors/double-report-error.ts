import { AppError } from '@/errors/app-error'

export class DoubleReportError extends AppError {
  constructor() {
    super(409, 'DOUBLE_REPORT', 'Leitura do mês já realizada')
  }
}
