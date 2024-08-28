import { env } from '@/env'
import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'node:fs'

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)

export const gemini = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export function fileToGenerativePart(path: string, mimeType: string) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString('base64'),
      mimeType,
    },
  }
}
