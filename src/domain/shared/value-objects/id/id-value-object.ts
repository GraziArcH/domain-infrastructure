import { InvalidIdValueObjectError } from './invalid-id-value-object-error'

export class IdValueObject {
  private constructor (private readonly id: number) {
    this.id = id
    Object.freeze(this)
  }

  public get value (): number {
    return this.id
  }

  static create (id: number): IdValueObject {
    if (!this.validate(id)) throw new InvalidIdValueObjectError()

    return new IdValueObject(id)
  }

  private static validate (id: number): boolean {
    if (!id) return false

    if (typeof id !== 'number') return false

    if (id <= 0) return false

    return true
  }
}
