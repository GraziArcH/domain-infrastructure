import { DomainError } from '@/domain/shared'

export class InvalidCompanyLegalNameValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidCompanyLegalNameValueObjectError'
    this.message = 'A razão social da compania deve ter entre 1 e 50 caracteres'
  }
}
