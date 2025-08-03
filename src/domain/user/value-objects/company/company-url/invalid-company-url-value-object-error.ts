import { DomainError } from '@/domain/shared'

export class InvalidCompanyUrlValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidCompanyUrlValueObjectError'
    this.message = 'O nome legal da compania deve ter entre 1 e 50 caracteres'
  }
}
