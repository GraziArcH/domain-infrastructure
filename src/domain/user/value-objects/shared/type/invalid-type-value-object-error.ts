import { DomainError } from '@/domain/shared'

export class InvalidTypeValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidTypeValueObjectError'
    this.message = 'O tipo precisa ser comercial ou pessoal'
  }
}
