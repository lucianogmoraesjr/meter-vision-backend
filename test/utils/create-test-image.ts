import { promises as fs } from 'fs'
import path from 'node:path'

export async function createTestImage(
  filename: string,
  mimeType: string,
): Promise<File> {
  const imagePath = path.resolve(__dirname, '..', 'assets', filename)

  const imageBuffer = await fs.readFile(imagePath)

  const imageBlob = new Blob([imageBuffer], { type: mimeType })

  const imageFile = new File([imageBlob], filename, {
    type: mimeType,
  })

  return imageFile
}
