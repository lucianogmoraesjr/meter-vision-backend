import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

import { InvalidDataError } from '@/use-cases/errors/invalid-data-error'
import { getMimeTypeFromBase64 } from '@/utils/get-mime-type-from-base64'
import { StorageService, Upload } from './storage-service'

export class DiskStorage implements StorageService {
  async upload(base64Image: string): Promise<Upload> {
    const base64 = base64Image.split(',')[1] ?? base64Image

    const mimeType = getMimeTypeFromBase64(base64Image)

    if (!mimeType) {
      throw new InvalidDataError(
        'Invalid image format. Must be a valid base64 image string with PNG, JPEG, or JPG type.',
      )
    }

    const [, extension] = mimeType.split('/')

    const filename = `${randomUUID()}.${extension}`

    const destination = path.resolve(__dirname, '../../../tmp', filename)
    this.ensureDirectoryExists(path.dirname(destination))
    const buffer = Buffer.from(base64, 'base64')
    await fs.promises.writeFile(destination, buffer)

    return {
      image_url: `http://localhost:3333/tmp/${filename}`,
      filename,
      mimeType,
    }
  }

  private ensureDirectoryExists(directory: string): void {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
  }
}
