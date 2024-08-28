import { AppError } from '@/errors/app-error'

export class DoubleReportError extends AppError {
  public static readonly statusCode = 409
  public static readonly errorCode = 'DOUBLE_REPORT'
  public static readonly errorDescription = 'Leitura do mês já realizada'

  constructor() {
    super(
      DoubleReportError.statusCode,
      DoubleReportError.errorCode,
      DoubleReportError.errorDescription,
    )
  }
}
