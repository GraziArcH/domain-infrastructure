import { InvalidTypeValueObjectError } from './invalid-type-value-object-error'

export class TypeValueObject {
  private constructor (private readonly type: string) {
    this.type = type
    Object.freeze(this)
  }

  public get value (): string {
    return this.type
  }

  static create (type: string): TypeValueObject {
    if (!this.validate(type)) throw new InvalidTypeValueObjectError()
    return new TypeValueObject(type)
  }

  private static validate (type: string): boolean {
    if (type !== 'comercial' && type !== 'pessoal') return false

    return true
  }
}
