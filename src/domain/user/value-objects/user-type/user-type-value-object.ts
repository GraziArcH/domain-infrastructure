import { InvalidUserTypeValueObjectError } from './invalid-user-type-value-object-error'

export class UserTypeValueObject {
  private constructor (private readonly userType: string) {
    this.userType = userType
    Object.freeze(this)
  }

  public get value (): string {
    return this.userType
  }

  static create (userType: string): UserTypeValueObject {
    if (!this.validate(userType)) throw new InvalidUserTypeValueObjectError()
    return new UserTypeValueObject(userType)
  }

  private static validate (userType: string): boolean {
    if (userType.length === 0 || userType.length > 20) return false

    return true
  }
}
