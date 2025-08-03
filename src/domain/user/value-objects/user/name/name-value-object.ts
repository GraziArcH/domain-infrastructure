import { InvalidNameValueObjectError } from './invalid-name-value-object-error'

export class NameValueObject {
  private constructor (private readonly name: string) {
    this.name = name
    Object.freeze(this)
  }

  public get value (): string {
    return this.name
  }

  static create (name: string): NameValueObject {
    if (!this.validate(name)) throw new InvalidNameValueObjectError()

    return new NameValueObject(name)
  }

  private static validate (name: string): boolean {
    if (typeof name !== 'string') return false

    if (name.length === 0 || name.length > 50) return false

    return true
  }
}
