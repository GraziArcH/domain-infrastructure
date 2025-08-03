export class InvalidDetailsValueObjectError extends Error {
  constructor () {
    super()
    this.name = 'InvalidDetailsValueObjectError'
    this.message = 'A ação deve ter entre 1 e 255 caracteres'
  }
}
