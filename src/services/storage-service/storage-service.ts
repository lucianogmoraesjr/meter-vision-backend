export interface Upload {
  image_url: string
  filename: string
  mimeType: string
}

export interface StorageService {
  upload(base64Image: string): Promise<Upload>
}
