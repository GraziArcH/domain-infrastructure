import { DomainError } from '@/domain/shared'

export class InvalidCompanyNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidCompanyNameValueObjectError'
    this.message = 'O nome da compania deve ter entre 1 e 50 caracteres'
  }
}
