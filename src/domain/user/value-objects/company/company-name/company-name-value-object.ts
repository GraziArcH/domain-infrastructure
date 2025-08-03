import { InvalidCompanyNameValueObjectError } from './invalid-company-name-value-object-error'

export class CompanyNameValueObject {
  private constructor (private readonly companyName: string) {
    this.companyName = companyName
    Object.freeze(this)
  }

  public get value (): string {
    return this.companyName
  }

  static create (companyName: string): CompanyNameValueObject {
    if (!this.validate(companyName)) throw new InvalidCompanyNameValueObjectError()

    return new CompanyNameValueObject(companyName)
  }

  private static validate (companyName: string): boolean {
    if (typeof companyName !== 'string') return false

    if (companyName.length === 0 || companyName.length > 60) return false

    return true
  }
}
