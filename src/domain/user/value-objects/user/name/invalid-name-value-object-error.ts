import { DomainError } from '@/domain/shared'

export class InvalidNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidNameValueObjectError'
    this.message = 'O nome é inválido'
  }
}
