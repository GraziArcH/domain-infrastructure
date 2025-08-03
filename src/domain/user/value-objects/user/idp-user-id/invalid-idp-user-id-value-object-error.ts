import { DomainError } from '@/domain/shared'

export class InvalidIDPUserIdValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidIDPUserIdValueObjectError'
    this.message = 'O Id do IDP deve ter entre 1 e 50 caracteres'
  }
}
