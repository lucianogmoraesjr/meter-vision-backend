import { AppError } from '@/errors/app-error'

export class BadImageError extends AppError {
  constructor() {
    super(
      400,
      'BAD_IMAGE',
      'Não foi possível ler o valor na imagem, tente novamente com uma imagem melhor',
    )
  }
}
