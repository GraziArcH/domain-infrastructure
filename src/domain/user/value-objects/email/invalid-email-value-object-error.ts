import { DomainError } from '@/domain/shared'

export class InvalidEmailValueObjectError extends DomainError {
  constructor (email: string) {
    super()
    this.name = 'InvalidEmailValueObjectError'
    this.message = `Esse email (${email}) é inválido`
  }
}
