export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly errorCode: string,
    public readonly errorDescription: string,
  ) {
    super(errorDescription)
  }
}
