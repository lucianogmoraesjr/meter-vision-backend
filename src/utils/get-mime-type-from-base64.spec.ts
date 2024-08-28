import { getMimeTypeFromBase64 } from './get-mime-type-from-base64'

describe('Get MIME type from base64 image', () => {
  it('should be able to get image/jpeg from a base64 jpeg image', () => {
    const mimeType = getMimeTypeFromBase64(
      '/9j/4AAQSkZJRgABAQEAYABgAAD/4QBmRXhpZgAATU0AKgAAAAgABgESAAMAAAABAAEAAAMBAAUAAAABAAAAVgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAOw1ESAAQAAAABA',
    )

    expect(mimeType).toBe('image/jpeg')
  })

  it('should be able to get image/png from a base64 png image', () => {
    const mimeType = getMimeTypeFromBase64(
      'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACGFjVEwAAAAUAAAAABwt8VIAAAAaZmNUTAAAAAAAAABkAAAAZAAAAAAAAAAAAEsD6AEAzUsGtwAAEhFJREFUeNrtmwuMHVd5x3',
    )

    expect(mimeType).toBe('image/png')
  })

  it('should be able to get image/jpeg from a base64 jpeg image without prefix', () => {
    const mimeType = getMimeTypeFromBase64(
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/',
    )

    expect(mimeType).toBe('image/jpeg')
  })

  it('should be able to get image/png from a base64 png image without prefix', () => {
    const mimeType = getMimeTypeFromBase64(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA',
    )

    expect(mimeType).toBe('image/png')
  })

  it('should be able to get null from a invalid base64 image', () => {
    const mimeType = getMimeTypeFromBase64(
      'asdfokjwefijasdfasmkdjnfapoiwejfasdfkj',
    )

    expect(mimeType).toBe(null)
  })
})
