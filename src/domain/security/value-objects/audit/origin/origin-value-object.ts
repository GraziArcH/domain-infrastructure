import { InvalidOriginValueObjectError } from './invalid-origin-value-object-error'

export class OriginValueObject {
  private constructor (private readonly origin: string) {
    this.origin = origin
    Object.freeze(this)
  }

  public get value (): string {
    return this.origin
  }

  static create (origin: string): OriginValueObject {
    if (!this.validate(origin)) throw new InvalidOriginValueObjectError()

    return new OriginValueObject(origin)
  }

  private static validate (origin: string): boolean {
    if (typeof origin !== 'string') return false

    if (origin.length === 0 || origin.length > 255) return false

    return true
  }
}
