import { InvalidDetailsValueObjectError } from './invalid-details-value-object-error'

export class DetailsValueObject {
  private constructor (private readonly details: string) {
    this.details = details
    Object.freeze(this)
  }

  public get value (): string {
    return this.details
  }

  static create (details: string): DetailsValueObject {
    if (!this.validate(details)) throw new InvalidDetailsValueObjectError()

    return new DetailsValueObject(details)
  }

  private static validate (details: string): boolean {
    if (typeof details !== 'string') return false

    if (details.length === 0 || details.length > 255) return false

    return true
  }
}
