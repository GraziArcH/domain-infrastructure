import { DomainError } from '../../errors'

export class InvalidIdValueObjectError extends DomainError {
  constructor () {
    super()
    this.name = 'InvalidIdValueObjectError'
    this.message = 'Um id precisa ser do tipo inteiro e maior que zero'
  }
}
