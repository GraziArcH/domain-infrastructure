import { InvalidDateValueObjectError } from './error'

export class DateValueObject {
  private constructor (private readonly date: Date) {
    this.date = date
    Object.freeze(this)
  }

  public get value (): Date {
    return this.date
  }

  static create (date: Date): DateValueObject {
    if (!this.validate(date)) throw new InvalidDateValueObjectError()

    return new DateValueObject(date)
  }

  private static validate (date: Date): boolean {
    if (!date) return false

    if (new Date(date).toString() === 'Invalid Date') return false

    return true
  }
}
