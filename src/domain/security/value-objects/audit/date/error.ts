export class InvalidDateValueObjectError extends Error {
  constructor () {
    super()
    this.name = 'InvalidDateValueObjectError'
    this.message = 'A data é inválida'
  }
}
