import { DomainError } from '@/domain/shared'

export class InvalidStringValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidStringValueObjectError'
    this.message = 'Uma string precisa ter mais de um caractere'
  }
}
