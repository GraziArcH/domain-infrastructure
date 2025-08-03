export class InvalidActionValueObjectError extends Error {
  constructor () {
    super()
    this.name = 'InvalidActionValueObjectError'
    this.message = 'A ação deve ter entre 1 e 50 caracteres'
  }
}
