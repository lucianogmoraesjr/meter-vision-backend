export function getMimeTypeFromBase64(base64String: string): string | null {
  const data = base64String.split(',')[1] || base64String
  const bytes = atob(data.substring(0, 16))

  const pngSignature = '\x89PNG\r\n\x1A\n'

  if (bytes.startsWith(pngSignature)) {
    return 'image/png'
  }

  if (bytes.startsWith('\xFF\xD8\xFF')) {
    return 'image/jpeg'
  }

  return null
}
