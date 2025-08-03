import { InvalidCompanyUrlValueObjectError } from './invalid-company-url-value-object-error'

export class CompanyUrlValueObject {
  private constructor (private readonly companyLegalName: string) {
    this.companyLegalName = companyLegalName
    Object.freeze(this)
  }

  public get value (): string {
    return this.companyLegalName
  }

  static create (companyUrl: string): CompanyUrlValueObject {
    if (!this.validate(companyUrl)) throw new InvalidCompanyUrlValueObjectError()

    return new CompanyUrlValueObject(companyUrl)
  }

  private static validate (companyUrl: string): boolean {
    if (typeof companyUrl !== 'string') return false

    if (companyUrl.length === 0 || companyUrl.length > 255) return false

    return true
  }
}
