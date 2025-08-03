import { DomainError } from '@/domain/shared'

export class InvalidUserTypeValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidUserTypeValueObjectError'
    this.message = 'O tipo do usuário precisa ter entre 1 e 20 caracteres'
  }
}
