import { DomainError } from '@/domain/shared'

export class InvalidCNPJValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidCNPJValueObjectError'
    this.message = 'O CNPJ é inválido'
  }
}
