import { InvalidCompanyLegalNameValueObjectError } from './invalid-company-legal-name-value-object-error'

export class CompanyLegalNameValueObject {
  private constructor (private readonly companyLegalName: string) {
    this.companyLegalName = companyLegalName
    Object.freeze(this)
  }

  public get value (): string {
    return this.companyLegalName
  }

  static create (companyLegalName: string): CompanyLegalNameValueObject {
    if (!this.validate(companyLegalName)) throw new InvalidCompanyLegalNameValueObjectError()

    return new CompanyLegalNameValueObject(companyLegalName)
  }

  private static validate (companyLegalName: string): boolean {
    if (typeof companyLegalName !== 'string') return false

    if (companyLegalName.length === 0 || companyLegalName.length > 150) return false

    return true
  }
}
