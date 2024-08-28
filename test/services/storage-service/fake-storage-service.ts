import { randomUUID } from 'node:crypto'

import {
  StorageService,
  Upload,
} from '@/services/storage-service/storage-service'

export class FakeStorageService implements StorageService {
  public uploads: Upload[] = []

  async upload(base64Image: string): Promise<Upload> {
    const upload: Upload = {
      filename: base64Image,
      image_url: randomUUID(),
      mimeType: 'image/jpeg',
    }

    this.uploads.push(upload)

    return upload
  }
}
