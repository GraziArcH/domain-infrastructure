import { InvalidStringValueObjectError } from './invalid-string-value-object-error'

export class StringValueObject {
  private constructor (private readonly string: string) {
    this.string = string
    Object.freeze(this)
  }

  public get value (): string {
    return this.string
  }

  static create (string: string): StringValueObject {
    if (!this.validate(string)) throw new InvalidStringValueObjectError()

    return new StringValueObject(string)
  }

  private static validate (string: string): boolean {
    if (typeof string !== 'string') return false

    if (string.length === 0) return false

    return true
  }
}
