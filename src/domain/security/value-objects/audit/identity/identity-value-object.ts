import { InvalidIdentityValueObjectError } from './invalid-identity-value-object-error'

export class IdentityValueObject {
  private constructor (private readonly identity: string) {
    this.identity = identity
    Object.freeze(this)
  }

  public get value (): string {
    return this.identity
  }

  static create (identity: string): IdentityValueObject {
    if (!this.validate(identity)) throw new InvalidIdentityValueObjectError()

    return new IdentityValueObject(identity)
  }

  private static validate (identity: string): boolean {
    if (typeof identity !== 'string') return false

    if (identity.length === 0 || identity.length > 100) return false

    return true
  }
}
