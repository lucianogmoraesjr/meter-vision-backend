export function generateUniqueFilename(
  customerCode: string,
  measureType: 'WATER' | 'GAS',
  extension: string,
) {
  return `${customerCode}-${measureType}${extension}`
}
