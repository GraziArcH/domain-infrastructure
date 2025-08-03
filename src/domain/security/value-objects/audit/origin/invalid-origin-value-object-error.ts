export class InvalidOriginValueObjectError extends Error {
  constructor () {
    super()
    this.name = 'InvalidOriginValueObjectError'
    this.message = 'A ação deve ter entre 1 e 255 caracteres'
  }
}
