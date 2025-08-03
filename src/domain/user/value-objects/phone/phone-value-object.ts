import { InvalidPhoneValueObjectError } from './invalid-phone-value-object-error'

export class PhoneValueObject {
  private constructor (private readonly phone: string) {
    this.phone = phone
    Object.freeze(this)
  }

  public get value (): string {
    return this.phone
  }

  static create (phone: string): PhoneValueObject {
    if (!this.validate(phone)) throw new InvalidPhoneValueObjectError()

    return new PhoneValueObject(phone)
  }

  private static validate (phone: string): boolean {
    const phoneConverted = phone
      .toString()
      .replace(/\D/g, '')

    const phoneWithoutDDD = phoneConverted.slice(2)

    if (phoneWithoutDDD.length < 8 || phoneWithoutDDD.length > 9) return false

    return true
  }
}
