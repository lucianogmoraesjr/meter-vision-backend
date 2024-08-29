import path from 'node:path'

import { fileToGenerativePart, gemini } from '@/lib/gemini'
import { AIService, Image } from './ai-service'

export class GeminiAiService implements AIService {
  async getValueFromImage({ filename, mimeType }: Image): Promise<string> {
    const baseDir = path.resolve(process.cwd(), 'tmp')
    const destination = path.join(baseDir, filename)

    const imagePart = fileToGenerativePart(destination, mimeType)
    const prompt = `
      You are receiving a photo of a consumption meter,
      this meter can be for water or gas. Return just the integer value of the measured consumption.
      For example: if the measured value is 0031.56, return 3156. Or if the measured value is 00166.815, return 166815.
      If you can't read the value in the image, return -1.
    `

    const { response } = await gemini.generateContent([prompt, imagePart])

    const text = response.text()

    return text
  }
}
