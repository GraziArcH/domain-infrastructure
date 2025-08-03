import { DomainError } from '@/domain/shared'

export class InvalidCPFValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidCPFValueObjectError'
    this.message = 'O CPF é inválido'
  }
}
