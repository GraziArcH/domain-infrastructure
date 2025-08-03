import { DomainError } from '@/domain/shared'

export class InvalidAgentTypeValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidAgentTypeValueObjectError'
    this.message = 'O tipo precisa ser comercializadora, distribuidora, geradora ou consumidora'
  }
}
