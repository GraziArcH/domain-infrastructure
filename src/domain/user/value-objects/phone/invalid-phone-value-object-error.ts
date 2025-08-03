import { DomainError } from '@/domain/shared'

export class InvalidPhoneValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidPhoneValueObjectError'
    this.message = 'O telefone precisa conter de 10 a 11 dígitos'
  }
}
