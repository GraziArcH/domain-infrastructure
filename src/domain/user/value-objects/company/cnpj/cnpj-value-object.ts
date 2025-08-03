import { InvalidCNPJValueObjectError } from './invalid-cnpj-value-object-error'

export class CNPJValueObject {
  private constructor (private readonly cnpj: string) {
    this.cnpj = cnpj
    Object.freeze(this)
  }

  public get value (): string {
    return this.cnpj
  }

  static create (cnpj: string): CNPJValueObject {
    if (!this.validate(cnpj)) throw new InvalidCNPJValueObjectError()

    return new CNPJValueObject(cnpj)
  }

  private static validate (cnpj: string): boolean {
    if (typeof cnpj !== 'string') return false

    const cnpjFormated = cnpj.replace(/[^\d]/g, '')

    if (cnpjFormated.length !== 14) return false

    let sum = 0
    let weight = 5

    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpjFormated.charAt(i)) * weight
      weight = weight === 2 ? 9 : weight - 1
    }

    let digitOne = 11 - (sum % 11)
    digitOne = digitOne > 9 ? 0 : digitOne

    sum = 0
    weight = 6

    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpjFormated.charAt(i)) * weight
      weight = weight === 2 ? 9 : weight - 1
    }

    let digitTwo = 11 - (sum % 11)
    digitTwo = digitTwo > 9 ? 0 : digitTwo

    if (parseInt(cnpjFormated.charAt(12)) !== digitOne || parseInt(cnpjFormated.charAt(13)) !== digitTwo) return false

    return true
  }
}
