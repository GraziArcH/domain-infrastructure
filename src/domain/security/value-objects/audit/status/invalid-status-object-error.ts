export class InvalidStatusValueObjectError extends Error {
  constructor () {
    super()
    this.name = 'InvalidStatusValueObjectError'
    this.message = 'O status são: sucesso, falha e erro'
  }
}
