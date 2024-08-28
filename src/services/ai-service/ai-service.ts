export interface Image {
  image_url: string
  filename: string
  mimeType: string
}

export interface AIService {
  getValueFromImage(data: Image): Promise<string>
}
