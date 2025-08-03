import { InvalidStatusValueObjectError } from './invalid-status-object-error'

export class StatusValueObject {
  private constructor (private readonly status: string) {
    this.status = status
    Object.freeze(this)
  }

  public get value (): string {
    return this.status
  }

  static create (status: string): StatusValueObject {
    if (!this.validate(status)) throw new InvalidStatusValueObjectError()

    return new StatusValueObject(status)
  }

  private static validate (status: string): boolean {
    if (typeof status !== 'string') return false

    if (status !== 'sucesso' && status !== 'falha' && status !== 'erro') return false

    return true
  }
}
