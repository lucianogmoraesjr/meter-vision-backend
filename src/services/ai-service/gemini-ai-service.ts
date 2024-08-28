import path from 'node:path'

import { fileToGenerativePart, gemini } from '@/lib/gemini'
import { AIService, Image } from './ai-service'

export class GeminiAiService implements AIService {
  async getValueFromImage({ filename, mimeType }: Image): Promise<string> {
    const destination = path.resolve(__dirname, '../../../tmp', filename)

    const imagePart = fileToGenerativePart(destination, mimeType)
    const prompt =
      'You are receiving a photo of a consumption meter, this meter can be for water or gas. Return the integer value of the measured consumption.'

    const { response } = await gemini.generateContent([prompt, imagePart])

    const text = response.text()

    return text
  }
}
