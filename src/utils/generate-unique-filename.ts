import { randomUUID } from 'node:crypto'
import path from 'node:path'

export function generateUniqueFilename(filename: string) {
  const extension = path.extname(filename)

  const baseName = path.basename(filename, extension)

  return `${baseName}-${randomUUID()}${extension}`
}
