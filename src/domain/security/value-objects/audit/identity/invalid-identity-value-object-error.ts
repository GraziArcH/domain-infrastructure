export class InvalidIdentityValueObjectError extends Error {
  constructor () {
    super()
    this.name = 'InvalidIdentityValueObjectError'
    this.message = 'A ação deve ter entre 1 e 100 caracteres'
  }
}
