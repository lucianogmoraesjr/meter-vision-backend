export class DoubleReportError extends Error {
  public readonly statusCode = 409
  public readonly errorCode = 'DOUBLE_REPORT'
  public readonly errorDescription = 'Leitura do mês já realizada'

  constructor() {
    super()
  }
}
